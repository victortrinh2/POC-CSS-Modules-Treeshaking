import { LocalStorageSessionManager } from "@squide/fakes";
import { MswSessionKey, type MswSession } from "./MswSession.ts";

export const sessionManager = new LocalStorageSessionManager<MswSession>({ key: MswSessionKey });
