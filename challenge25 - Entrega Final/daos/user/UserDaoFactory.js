import UserDaoFile from "./UserDaoFile.js";
import UserDaoMemory from "./UserDaoMemory.js";
import UserDaoMongoDB from "./UserDaoMongoDB.js";

import { DAOSOURCE } from "../../controllers/server.controllers.js";
let daoSource = null;

switch (DAOSOURCE.toLowerCase()) {
  case "mongo":
    daoSource = new UserDaoMongoDB();
    break;
  case "file":
    daoSource = new UserDaoFile();
    break;
  default:
    daoSource = new UserDaoMemory();
}

export default class UserDaoFactory {
  static getDaoSource() {
    return daoSource;
  }
}
