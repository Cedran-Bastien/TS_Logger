# TS_Logger

## Description

It's a logger for JavaScript base app

Logs will be in file with current date for name in "Logs" directory 

Logs will also be put in command lines with "console.log" automatically
 
## Utilisation

After import logger in your project : 

 - For a normale log with 'text' the text to put in your log : 

```ts
log.info(text)
```

 - For error's log with 'text' the text to put in your log : 

```ts
log.error(text)
```

 - For project using 'discord.js' lib, 'Interaction' logs with 'interact' the Interaction to log (format : "date + username + guild + commandName") 

```ts
log.interaction(interact)
```


 - You can optionally prepare the logs files and directory when you want with:


```ts
log.initLogs()
```