"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.error = exports.info = exports.interaction = exports.initLogs = void 0;
const fs = __importStar(require("fs"));
const colors = __importStar(require("colors/safe"));
// Constant
const LOG_INFO = 1;
const LOG_ERROR = 2;
// Set current FilePath
let logsPath = "";
function initLogs() {
    // Set logs path
    const date = new Date();
    logsPath = `logs/${date.toDateString() + "_" + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()}.txt`;
    // Creating logs dir if does not exist
    var dir = './logs';
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
    // Creating or opening file
    fs.writeFile(logsPath, 'LOGS OF ' + date + '\n\n', (err) => {
        if (err) {
            console.log("Failed to create logs file : error : " + err);
        }
        // Preparing inital logs
        const date = new Date();
        const log = date.getHours() + ":"
            + date.getMinutes() + ":"
            + date.getSeconds() + " - Logging file created \n";
        // Writing initial logs
        fs.appendFile(logsPath, log, (err) => {
            if (err)
                console.log("Failed to write after title in logs file ");
        });
    });
}
exports.initLogs = initLogs;
function logging(currentLog, goal) {
    const date = new Date();
    let log = date.getHours() + ":"
        + date.getMinutes() + ":"
        + date.getSeconds() + " - "
        + currentLog;
    // Set color
    if (goal === LOG_INFO) {
        log = colors.blue(log);
    }
    else if (goal == LOG_ERROR) {
        log = colors.red(log);
    }
    // Put log in the file
    fs.appendFile(logsPath, log + '\n', (err) => {
        if (err) {
            console.log("Failed to write logs in file");
            initLogs();
            fs.appendFile(logsPath, log + '\n', (err) => {
                if (err) {
                    console.log();
                }
            });
        }
    });
    // Login console
    console.log(log);
}
function interaction(interaction) {
    logging(interaction.member.guild.name + " - "
        + interaction.member.user.username + " - "
        + interaction.commandName, LOG_INFO);
}
exports.interaction = interaction;
function info(obj) {
    logging(JSON.stringify(obj), LOG_INFO);
}
exports.info = info;
function error(text) {
    logging(text, LOG_ERROR);
}
exports.error = error;
// Initialisation
// initLogs()
