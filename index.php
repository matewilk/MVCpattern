<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>MVC Pattern Implementation</title>
        
        <script src="js/javascript.js" type="text/javascript"></script>
        
        <script type="text/javascript">
               window.onload = function () {
                    var model = new Model();
                    var view = new View(model);
                    var controller = new Controller(view, model);

                    controller.init();
                }
        </script>
    </head>
    <body>
        <input type="text" id="iteminput" value="" placeholder="Add items to list"/>
        <input type="button" id="addbtn" value="add"/>
        <div>
            <ul id="itemslist">
            </ul>
        </div>
        <div id="counter">
            
        </div>
    </body>
</html>
