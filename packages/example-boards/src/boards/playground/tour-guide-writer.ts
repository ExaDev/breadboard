


import { annotate, array, board, converge, input, loopback, object, output } from "@breadboard-ai/build"

import { invoke, code, passthrough } from "@google-labs/core-kit";
import { prompt, promptPlaceholder } from "@google-labs/template-kit";

const location = input({ title: "location", type: "string", default: "Stresa, Italy" })
const boardLocation = input({
  title: "Board Location", type: annotate(object({}), {
    behavior: ["board"],
  }), default: ["text-generator.json"]
})
// THIS MIGRATION DOES NOT USE CORE.CURRY OR CORE.MAP AS THEY HAVE NOT YET BEEN MIGRATED
const itenaryTemplate = prompt`[Place] Seattle, WA
  [Top ten place-based experiences with no duplicates]
  1) See the city from the Space Needle
  2) Watch the fish throwing at Pike Place Market
  3) Add chewing gum to the The Gum Wall
  4) Stroll the Chihuly Garden and Glass Museum
  5) Take a selfie with the Fremont Troll
  6) Walk the quad at the University of Washington
  7) Watch the octopus feeding at the Seattle Aquarium
  8) Learn about aviation history at the Museum of Flight
  9) Wander the art at the Seattle Art Museum
  10) See the baby gorilla at the Woodland Park Zoo

  [Place] Madrid, Spain
  [Top ten place-based experiences with no duplicates]
  1) Stroll the Gran Via
  2) See the Prado Museum
  3) Attend a Real Madrid game
  4) Stroll through the Mercado de San Miguel
  5) Sip wine at the Bodega de Palacio
  6) Go clubbing at the Chueca district
  7) Shop at the El Rastro flea market
  8) Take a selfie at the Puerta del Sol
  9) Shop at the El Corte Ingles
  10) Enjoy tapas and wine at La Latina

  [Place] Chicago, IL
  [Top ten place-based experiences with no duplicates]
  1) Attend a Chicago Bulls game
  2) Stroll the Magnificent Mile
  3) Go to a museum at the Museum of Science and Industry
  4) Stroll the Millennium Park
  5) Visit the Willis Tower
  6) See the Chicago River
  7) Take a selfie at the Bean
  8) Eat deep dish pizza at Giordano's
  9) Shop at the Water Tower Place
  10) See the Chicago Theatre

  [Place] ${promptPlaceholder(location, { name: "location" })}
  [Top ten place-based experiences with no duplicates]
  `.configure({ id: "travelTininerary" })


const travelItinerary = invoke({$id:"Travel Itenary", $board: boardLocation, text: itenaryTemplate, stopSequences: ["\n[Place]"], useStreaming: false, }).unsafeOutput("text")

const splitItinerary = code({ itenary: travelItinerary }, { list: array("string") }, ({ itenary }) => {
  const input = itenary as unknown as string
  const list = input
    .split(/[0-9]{1,2}\)/)
    .map((e) => e.trim())
    .filter((e) => e !== "");
  return { list } as any;
})

const popLoopBack = loopback({ type: array("string") })

const pop = code({ $id: "Pop", array: converge(splitItinerary.outputs.list, popLoopBack) }, { array: array("string"), item: "string" }, ({ array }) => {
  const [item, ...rest] = array;
  if (item) {
    return { array: rest, item: item } as any;
  }
  return {} as any;
})

const boardLoop = loopback({
  type: annotate(object({}), {
    behavior: ["board"],
  }),
})

const locationLoop = loopback({ type: "string" })
const itemLoopBack = loopback({ type: "string" })
itemLoopBack.resolve(pop.outputs.item)
popLoopBack.resolve(pop.outputs.array)

// @ts-ignore
const passthroughOutput = passthrough({ board: converge(boardLocation, boardLoop), item: pop.outputs.item, array: pop.outputs.array, location: converge(location, locationLoop) });

locationLoop.resolve(passthroughOutput.outputs.location)
boardLoop.resolve(passthroughOutput.outputs.board)

const guideTemplate = prompt`[City] Paris, France
    [Activity] Have a picnic in the Luxembourg Gardens
    [Experiential story] Grab a baguette, some cheese and bottle of wine and head over to Luxembourg Gardens. You'll enjoy an even stroll, a great chance to people watch, and a charming free evening that is quintessentially Parisian.

    [City] Madrid, Spain
    [Activity] See the Prado Museum
    [Experiential story] The Prado is an art lover's paradise. It is home to the largest collection of works by Goya, Velazquez, and El Greco. There are also works by Picasso, Monet, and Rembrandt. The Prado is a must-see for anyone visiting Madrid.

    [City] Tatooine
    [Activity] Catch a pod race
    [Experiential story] A pod race is a race of flying engines called pods. Pod racing is a dangerous sport and was very popular in the Outer Rim Territories before the Empire was formed.


    [City] ${promptPlaceholder(passthroughOutput.outputs.location, { name: "location" })}
    [Activity] ${promptPlaceholder(passthroughOutput.outputs.item, { name: "activity" })}
    [Experiential story]
    `.configure({ id: "guideTemplate" })


const guideOutput = invoke({$id:"Guide", $board: converge(boardLocation, boardLoop), text: guideTemplate.outputs.prompt, stopSequences: ["\n[Place]"], useStreaming: false, }).unsafeOutput("text")
const arrayLoop = loopback({ type: array("string") })

// get output for each activity 
const accummulate = code({ $id: "Accummulate", item: guideOutput, array: converge([], arrayLoop) }, { array: array("string") }, ({ item, array }) => {
  return { array: [...array as [], item] } as any;
}).outputs.array

arrayLoop.resolve(accummulate)

// return results only when popped array is empty
const emitter = code({ $id: "Emitter", poppedArray: pop.outputs.array, accumulate: accummulate }, { emit: array("string"), a: array("string"), b: array("string") }, ({ poppedArray, accumulate }) => {
  let emit = undefined;

  if (!poppedArray || poppedArray.length === 0) {
    // @ts-ignore
    emit = accumulate;
  }

  // board wont return until output is set, so if it's undefined we will keep looping until the array is empty
  return { emit: emit } as any;
})

const combineGuides = code({$id:"combineGuide", location: location, itenary: splitItinerary.outputs.list, guides: emitter.outputs.emit }, {guide: "string"}, ({location, itenary, guides}) => {
  const guideList = guides.map((item) => item);
  return {
    guide: `# ${location}\n${itenary
      .map((activity, index) => `## ${activity}\n${guideList[index]}\n\n`)
      .join("")}`,
  } as any;
})


export default board({
  title: "Tour Guide Writer",
  version: "0.1.0",
  inputs: { location, boardLocation },
  outputs: { output: output(combineGuides.outputs.guide), itenary:(travelItinerary) }
})
