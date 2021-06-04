# events-excersice 2

## Acceptance criteria

* add todos
* todo must be expandend when clicking on file name link, expand button or empty header space
* hovering over filename must reveal a preview of the expanded state
* expanded button text must change to collapse when todo is expanded and viceversa
* expand buttton must condense or cillapse the todo based on the above
* when a todo content is focused, its backgroun must change color
* if todo is not "published" and alert must pop up when trying to cut or copy its contents, and the action mus be prevented
* clicking the "make public" button shou "publish" the todo
  * "published" todos must:
    * remain expanded
    * hide/remove the expand/collapse button
    * disable preview on file name hover
    * allow copy or cut actions

* clicking the "X" button must destry/scrap the todo
  * scrapped todos must:
    * change the "X" button text to "restore"
    * hide all information except the restore button
    * set the todo backgroun to red

  * if the item is expanded upon scrapping, it must be collapsed
  * clicking the restore button must restore the todo to its normal or published state as it was before scrapping

## Bonus!

* Make the todo creation take input from the user

* Make the controls safe*

_*:With the provided css and html many elements are hidden just visually, curious users could manipulate this elements to cause undesired behaviour, make sure controls are removed when they should be inaccesible and restored when necessary_
