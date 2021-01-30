namespace MyONez.Base.Screens
{
    #region Using Directives

    using System;
    using System.Collections.Generic;

    using FaceUI.Entities;

    using Microsoft.Xna.Framework;
    using Microsoft.Xna.Framework.Graphics;

    using MyONez.Base.AdditionalStuff.FaceUI.ECS.Components;
    using MyONez.Base.AdditionalStuff.SceneTransitions;
    using SpineEngine.Graphics.Renderers;
    using SpineEngine.Graphics.ResolutionPolicy;
    using SpineEngine.Graphics.Transitions;
    using MyONez.Base.Utils;
    using SpineEngine;

    #endregion

    [SampleScene("Transitions Scene", "Scene that shows different transitions.")]
    public class TransitionsScene : BaseScene
    {
        public TransitionsScene()
        {
            this.SetDesignResolution(1280, 720, SceneResolutionPolicy.BestFit);
            Core.Instance.Screen.SetSize(1280, 720);

            this.AddRenderer(new RenderLayerExcludeRenderer(ScreenSpaceRenderLayer));

            var entity = this.CreateEntity("ui");
            var ui = entity.AddComponent<UIComponent>().UserInterface;
            var panel = new Panel(new Vector2(300, -1), PanelSkin.None);
            ui.AddEntity(panel);
            foreach (var transitionDescription in GetTransitions())
            {
                var button = new Button(transitionDescription.Item1);
                panel.AddChild(button);
                button.OnClick += butt =>
                {
                    var transition = transitionDescription.Item2();
                    transition.SceneLoadAction = () => this;
                    Core.Instance.SwitchScene(transition);
                };
            }
        }

        private IEnumerable<Tuple<string, Func<SceneTransition>>> GetTransitions()
        {
            yield return new Tuple<string, Func<SceneTransition>>("Cinematic Letterbox", () => new CinematicLetterboxTransition());
            yield return new Tuple<string, Func<SceneTransition>>("Fade", () => new FadeTransition());
            yield return new Tuple<string, Func<SceneTransition>>("Quick", () => new QuickTransition());
            yield return new Tuple<string, Func<SceneTransition>>("Squares", () => new SquaresTransition());
            yield return new Tuple<string, Func<SceneTransition>>("Texture Wipe", () => new TextureWipeTransition(this.Content.Load<Texture2D>(ContentPaths.Textures.TextureWipeTransition.angular)));
            yield return new Tuple<string, Func<SceneTransition>>("Transform", () => new TransformTransition());
            yield return new Tuple<string, Func<SceneTransition>>("Wind", () => new WindTransition());
        }
    }
}