/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import { Breadboard } from "@google-labs/breadboard";

export type ResourceArgs<T> = {
  resource?: T;
  title?: string;
  url?: string;
};

export type ReferencedResourceArgs<T> = {
  resource?: never;
  title?: string;
  url: string;
};

export type ConcreteResourceArgs<T> = {
  resource: T;
  title?: string;
  url?: never;
};

export type RetrievedResourceArgs<T> = {
  resource: T;
  title?: string;
  url: string;
};

export type FetchedOrConcreteResource<T> =
  | ConcreteResource<T>
  | RetrievedResource<T>;

export abstract class Resource<T> {
  readonly title?: string;
  readonly url?: string;
  readonly resource?: T;

  constructor(args: ResourceArgs<T>) {
    this.title = args.title;
    this.url = args.url;
    this.resource = args.resource;
  }

  static isReference<T>(
    resource: Resource<T>
  ): resource is ReferencedResource<T> {
    return resource.url !== undefined && !resource.resource;
  }

  static isRetrieved<T>(
    resource: Resource<T>
  ): resource is RetrievedResource<T> {
    return resource.url !== undefined && resource.resource !== undefined;
  }

  static isConcrete<T>(resource: Resource<T>): resource is ConcreteResource<T> {
    return resource.resource !== undefined;
  }

  // isConcrete(): this is ConcreteResource<T> {
  //   return Resource.isConcrete(this);
  // }

  // isRetrieved(): this is RetrievedResource<T> {
  //   return Resource.isRetrieved(this);
  // }

  // isReferenced(): this is ReferencedResource<T> {
  //   return Resource.isReference(this);
  // }

  static async retrieve<T>(res: Resource<T>): Promise<T> {
    if (Resource.isRetrieved(res)) {
      return res.resource;
    } else if (Resource.isConcrete(res)) {
      return res.resource;
    } else if (Resource.isReference(res)) {
      return await ReferencedResource.retrieve(res);
    } else {
      throw new Error("Unknown resource type");
    }
  }

  // async retrieve(): Promise<T> {
  //   const value = await Resource.retrieve(this);
  //   Object.defineProperty(this, "resource", {
  //     value,
  //     writable: false,
  //   });
  //   return this.resource!;
  // }

  // async fetch(): Promise<FetchedOrConcreteResource<T>> {
  //   return Resource.fetch(this);
  // }

  static async fetch<T>(
    res: Resource<T>
  ): Promise<FetchedOrConcreteResource<T>> {
    const value = await Resource.retrieve(res);
    Object.defineProperty(res, "resource", {
      value,
      writable: false,
    });
    return res as FetchedOrConcreteResource<T>;
  }
}

export abstract class ReferencedResource<T> extends Resource<T> {
  readonly url: string;

  constructor(args: ReferencedResourceArgs<T>) {
    super(args);
    this.url = args.url;
  }

  static async retrieve<T>(res: ReferencedResource<T>): Promise<T> {
    if (ReferencedResource.isRemote(res)) {
      return await ReferencedRemoteResource.retrieve(res);
    } else if (ReferencedResource.isLocal(res)) {
      return await ReferencedLocalResource.retrieve(res);
    } else {
      throw new Error("Unknown resource type");
    }
  }

  static isRemote<T>(res: Resource<T>): res is ReferencedRemoteResource<T> {
    try {
      new URL(res.url!);
      return true;
    } catch (e) {
      return false;
    }
  }

  // isRemote(): boolean {
  //   return ReferencedResource.isRemote(this);
  // }

  static isLocal<T>(
    res: ReferencedResource<T>
  ): res is ReferencedLocalResource<T> {
    return !ReferencedResource.isRemote(res);
  }

  // isLocal(): boolean {
  //   return ReferencedResource.isLocal(this);
  // }
}

export abstract class ReferencedLocalResource<T> extends ReferencedResource<T> {
  static async retrieve<T>(res: ReferencedLocalResource<T>): Promise<T> {
    return (await import(res.url)).default;
  }
}

export abstract class ReferencedRemoteResource<
  T,
> extends ReferencedResource<T> {
  static async retrieve<T>(res: ReferencedRemoteResource<T>): Promise<T> {
    return await (await fetch(res.url)).json();
  }
}

export abstract class ConcreteResource<T> extends Resource<T> {
  readonly resource: T;
  readonly url?: never = undefined as never;

  constructor(args: ConcreteResourceArgs<T>) {
    super(args);
    this.resource = args.resource;
  }
}

export abstract class RetrievedResource<T> extends Resource<T> {
  readonly title?: string;
  readonly resource: T;
  readonly url: string;

  constructor(args: RetrievedResourceArgs<T>) {
    super(args);
    this.resource = args.resource;
    this.url = args.url;
    this.title = args.title;
  }
}

export class BoardResource extends Resource<Breadboard> {
  readonly version?: string;
  constructor(args: { version?: string } & ResourceArgs<Breadboard>) {
    super(args);
  }
}
export class BreadboardManifest {
  readonly title?: string;
  readonly boards?: BoardResource[];
  readonly manifests?: ManifestResource[];

  constructor({
    title,
    boards = [],
    manifests = [],
  }: {
    title?: string;
    boards: BoardResource[];
    manifests: ManifestResource[];
  }) {
    this.title = title;
    this.boards = boards;
    this.manifests = manifests;
  }

  static async retrieveBoards(
    boards: BoardResource[]
  ): Promise<FetchedOrConcreteResource<Breadboard>[]> {
    const updated: FetchedOrConcreteResource<Breadboard>[] = [];
    for await (const board of boards) {
      updated.push(await Resource.fetch(board));
    }
    return updated;
  }

  // async retrieveBoards(): Promise<FetchedOrConcreteResource<Breadboard>[]> {
  //   for await (const board of this.boards) {
  //     const index = this.boards.indexOf(board);
  //     const updated = await board.fetch();
  //   }
  //   return this.boards as FetchedOrConcreteResource<Breadboard>[];
  // }
}

export class ManifestResource extends Resource<BreadboardManifest> {
  constructor(args: ResourceArgs<BreadboardManifest>) {
    super(args);
  }
}
export class ConreteManifestResource extends ConcreteResource<BreadboardManifest> {
  constructor(args: ConcreteResourceArgs<BreadboardManifest>) {
    super(args);
  }
}
