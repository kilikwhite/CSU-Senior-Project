//import { Meteor } from 'meteor/meteor';
//import 'src/Programing_VS/lib/CodeMirror/mode/javascript/javascript.js';
//import '/lib/ACE/ace.js';
//import '/lib/ACE/mode-javascript.js';
//import '/lib/ACE/theme-terminal.js';
//src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js";

var codeEditor = ace.edit("editor");

function executeCode(){
    let code = document.querySelector('editor');
    let frame = document.querySelector('returns');
    frame.open();
    frame.write('<script>${code}</script>');
    frame.close();
}


window.onload = function(){
    codeEditor = ace.edit("editor");
    codeEditor.setTheme("ace/theme/terminal");
    codeEditor.session.setmode("ace/mode/javascript");
    //editor.session.setMode("src/Programing_VS/lib/ACE/mode-javascript.js"); // editor language
    //editor.setTheme("src/Programing_VS/lib/ACE/theme-dawn.js"); // editor theme
    editor.session.setTabSize(4);
    editor.session.setUseWrapMode(true);
}

//Meteor.methods({
    /*'global.onload':function(){
        let editor = ace.edit("editor");
        //editor.setTheme("ace/theme/terminal");
        //editor.session.setmode("ace/mode/javascript");
        editor.session.setMode("src/Programing_VS/lib/ACE/mode-javascript.js"); // editor language
        editor.setTheme("src/Programing_VS/lib/ACE/theme-dawn.js"); // editor theme
        editor.session.setTabSize(4);
        editor.session.setUseWrapMode(true);
    }*/
//});
