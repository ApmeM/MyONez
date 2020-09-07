namespace GeonBit.UI.ECS.EntitySystems
{
    using System;

    using GeonBit.UI.ECS.Components;
    using GeonBit.UI.Utils;

    using LocomotorECS;
    using LocomotorECS.Matching;

    using Microsoft.Xna.Framework;
    using Microsoft.Xna.Framework.Content;
    using Microsoft.Xna.Framework.Graphics;

    using MyONez;
    using MyONez.ECS;
    using MyONez.ECS.Components;

    public class UIUpdateSystem : EntityProcessingSystem, IScreenResolutionChangedListener
    {
        private readonly MeshBatchWrapper spriteBatchWrapper = new MeshBatchWrapper();

        private TimeSpan totalTime = TimeSpan.Zero;

        public UIUpdateSystem(ContentManager content)
            : base(new Matcher().All(typeof(UIComponent)))
        {
            UserInterface.Initialize(content, BuiltinThemes.hd);
        }

        protected override void DoAction(Entity entity, TimeSpan gameTime)
        {
            base.DoAction(entity, gameTime);
            var ui = entity.GetComponent<UIComponent>();
            var scale = entity.GetComponent<ScaleComponent>()?.Scale ?? Vector2.One;
            var mouse = entity.GetOrCreateComponent<InputMouseComponent>();
            var finalRender = entity.GetOrCreateComponent<FinalRenderComponent>();

            this.totalTime += gameTime;

            UserInterface.Active = ui.UserInterface;
            ui.UserInterface.MouseInputProvider = ui.MouseProvider;
            ui.MouseProvider._oldMouseState = ui.MouseProvider._newMouseState;
            ui.MouseProvider._newMouseState.X = mouse.ScaledMousePosition.X;
            ui.MouseProvider._newMouseState.Y = mouse.ScaledMousePosition.Y;
            ui.MouseProvider._newMouseState.LeftButton = mouse.CurrentMouseState.LeftButton;
            ui.MouseProvider._newMouseState.RightButton = mouse.CurrentMouseState.RightButton;
            ui.MouseProvider._newMouseState.MiddleButton = mouse.CurrentMouseState.MiddleButton;
            ui.MouseProvider._newMouseState.ScrollWheelValue = mouse.CurrentMouseState.ScrollWheelValue;

            ui.UserInterface.GlobalScale = scale.X;
            ui.GameTime.TotalGameTime = this.totalTime;
            ui.GameTime.ElapsedGameTime = gameTime;
            ui.UserInterface.Update(ui.GameTime);
            this.spriteBatchWrapper.MeshBatch = finalRender.Batch;
            this.spriteBatchWrapper.MeshBatch.Clear();
            ui.UserInterface.Draw(this.spriteBatchWrapper);
        }

        public void SceneBackBufferSizeChanged(Rectangle realRenderTarget, Rectangle sceneRenderTarget)
        {
            ((ScreenGraphicDeviceWrapper)this.spriteBatchWrapper.GraphicsDevice).ViewRectangle = sceneRenderTarget;
        }
    }
}