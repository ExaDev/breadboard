import { GoogleAuth } from "google-auth-library";
import { auth } from "./index.js";

export async function getFunctionUrl(
  name: string,
  location: string = "us-central1"
): Promise<string> {
  if (!auth) {
    auth = new GoogleAuth({
      scopes: "https://www.googleapis.com/auth/cloud-platform",
    });
  }
  const projectId = await auth.getProjectId();
  const url = "https://cloudfunctions.googleapis.com/v2beta/" +
    `projects/${projectId}/locations/${location}/functions/${name}`;

  const client = await auth.getClient();
  const res = await client.request({ url });
  // const uri = res.data?.serviceConfig?.uri;
  const resData: {
    serviceConfig: {
      uri: string;
    };
  } = res.data as any;
  const uri = resData["serviceConfig"]["uri"];
  if (!uri) {
    throw new Error(`Unable to retreive uri for function at ${url}`);
  }
  return uri;
}
