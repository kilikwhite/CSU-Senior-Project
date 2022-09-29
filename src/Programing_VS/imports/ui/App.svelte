
<script>
  src="src/Programing_VS/lib/ACE/ace.js";
  src="src/Programing_VS/lib/ACE/mode-javascript.js";
</script>



    

<!--make this go to the top left-->
<div id="back">Back</div>
  
<!--This will be filler for the questions-->
<div id="q">Questions</div>
    
<!--This will be a selectable thing if i can make it to other languages-->
<div class="control-panel">
  <select id="languages" class="languages" onchange="changeLanguage()">
        <option value="javascript"> javascript </option>
  </select>
  
</div>

<!--This will be where the code will go-->
<div class="Code-area" id = "editor">
  <!--<textarea class="editor"></textarea> -->
</div> 


    <!--<form>  
        <input class="editor" type="text" id="editor"><br/>    
    </form>-->

<div class="button-container">
    <button class="btn"> Run </button>
    <button class="Cbtn"> Clear</button>
</div>

<!--where the output is at-->
<div class="Code-area">
  <textarea class="returns"></textarea>
</div>
