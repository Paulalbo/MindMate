# MindMate - outsorce your mind and rest (or at least try it with this thing)

## Why

It's a simple test project to learn React and try a few libaries, npm packages

## What it does

It's a simple task manager where you can create notes and tasks (more to come). It works locally and saves your data in the local storage of your browser. To make sure you don't loose your data you are able to export and import your data as often as you like.

- Saves your data in the local storage as json data:

```js
   {
  "tasks": [
    {
      "id": "1699178864335",
      "event": "First task",
      "description": "",
      "status": "Idea",
      "duedate": "2023-11-05"
    },
    {
      "id": "1699178873122",
      "event": "Second Task",
      "description": "",
      "status": "Open",
      "duedate": "2023-11-05"
    },
    {
      "id": "1699178874414",
      "event": "Third Task",
      "description": "",
      "status": "In Progress",
      "duedate": "2023-11-05"
    },
    {
      "id": "1699178875494",
      "event": "Fourth task",
      "description": "",
      "status": "Done",
      "duedate": "2023-11-05"
    }
  ],
  "name": "your name",
  "notes": [
    {
      "id": "1699179007848",
      "title": "Note I",
      "content": "<h1>Heading 1</h1>\n<p><br>\n</p>\n<p>content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content<strong> content bold</strong> content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content&nbsp;</p>\n<p><br>\n</p>\n<h2>heading 2</h2>\n<p><br>\n</p>\n<p>content content content content content content content content content content content content content content<em> content italic content italic </em>content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content&nbsp;</p>\n<p><br>\n</p>\n<h3>heading 3</h3>\n<p><br>\n</p>\n<p>content content content content <del>content strikethrough content strikethrough content strikethrough</del> content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content&nbsp;</p>",
      "date": "2023-11-05T10:10:41.619Z"
    },
    {
      "id": "1699179034585",
      "title": "Note II",
      "content": "<h2>Heading test</h2>\n<p><br></p>\n<p>content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content</p>",
      "date": "2023-11-05T10:10:34.585Z"
    }
  ]
}
```

- you can export your data with a simple button click as file `mind-mate-data-dd-mm-yyy-hh-mm` for example export on 5th November 2023 at 11:10 am will be named `mind-mate-data-05-11-2023-11-10` and import it again when you want to continue working ... or lived it saved in the browser.

## Future steps - upcoming changees

- Rebuild the whole thing to an electron desktop app, so I'm not limited to the local storage of the browser
- Clean up and structure it better, because its my first react project there is a loot of mess inside here ... but hey it works
- add additional features like calender, goal saver (simple thing to save big picture goals and divide them into smaller tasks), Alerts in case you are missing the due date of tasks
