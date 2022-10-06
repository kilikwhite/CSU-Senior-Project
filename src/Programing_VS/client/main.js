import { Meteor } from 'meteor/meteor';
import App from '../imports/ui/App.svelte';
//import '../server/main.js';

//remember to copy and paste this section later
/*
let editor;

window.onload = function(){
  editor = ace.edit("editor");
  editor.setTheme("ace/theme/monokai");
  editor.session.setMode("ace/mode/javascript");
}

function changeLanguage() {
  let language = $("#languages").val();

  if(language == 'javascript')editor.session.setMode("ace/mode/javascript");
}

function executeCode(){
  $.ajax({
    url: "../server/main.js", 
    method: "POST",
    data: {
      language: $("#languages").val(),
      code: editor.getSession().getValue()
    },
    success: function(response){
      $(".output").text(response)
    }
  })
}
*/
//remember to copy and paste this section later
Meteor.startup(() => {
  new App({
    target: document.getElementById('app')
  });
});