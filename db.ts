import * as fs from 'fs';
import * as path from 'path';
import * as datastore from 'nedb-promise';
import {app} from "electron";
import * as FS from "fs";

export class DB {
  static words: any;

  static async init () {
    const database = path.join(__dirname + "/assets/db/dictionary.json");
    const native_dir = app.getAppPath();
    const db_dir = path.join(native_dir, "db");
    const collection = path.join(db_dir, "dictionary.json");

    if(!FS.existsSync(db_dir)) FS.mkdirSync(db_dir, 0o777);
    FS.writeFileSync(collection, FS.readFileSync(database), {mode : 0o777});

    process['aaa'] = "sdgsgsag";
    DB.words = datastore({ filename: collection, autoload: true});

    console.log(await DB.words.findOne({}));
    // this.queries.ensureIndex({ fieldName: ''});
  }
}
