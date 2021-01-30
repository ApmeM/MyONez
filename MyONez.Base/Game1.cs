namespace MyONez.Base
{
    using System.Collections.Generic;

    using MyONez.Base.AdditionalStuff.FaceUI.Utils;
    using MyONez.Base.AdditionalStuff.Scenes;
    using MyONez.Base.Screens;
    using SpineEngine;

    /// <summary>
    ///     This is the main type for your game.
    /// </summary>
    public class Game1 : Core
    {
        public Game1()
            : base(650, 800)
        {
            this.Window.AllowUserResizing = true;
            this.IsMouseVisible = false;
        }

        protected override void Initialize()
        {
            base.Initialize();
            Instance.SwitchScene(new LoadingScene<BasicScene>(new List<LoadingData>
            {
                new LoadingData
                {
                    Count = 47,
                    Enumerator = GeonBitUIResources.GetEnumerator(this.Content, "hd")
                },
            }, 1200, 600));
        }
    }
}