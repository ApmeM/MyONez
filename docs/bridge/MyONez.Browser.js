/**
 * @version 1.0.0
 * @author MyONez.Browser
 * @compiler Bridge.NET 17.6.0
 */
Bridge.assembly("MyONez.Browser", function ($asm, globals) {
    "use strict";

    Bridge.define("MyONez.Browser.App", {
        main: function Main () {
            var canvas = document.createElement("canvas");
            canvas.width = 800;
            canvas.height = 480;
            canvas.id = "monogamecanvas";
            document.body.appendChild(canvas);

            document.body.appendChild(document.createElement("br"));

            var can = document.createElement("canvas");
            can.width = 800;
            can.height = 1024;
            document.body.appendChild(can);

            MyONez.Browser.App.game = new MyONez.Base.Game1();
            MyONez.Browser.App.game.Run();
        },
        statics: {
            fields: {
                game: null
            }
        }
    });
});
