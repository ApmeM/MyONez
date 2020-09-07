namespace GeonBit.UI.ECS.Components
{
    using LocomotorECS;

    using Microsoft.Xna.Framework;

    public class UIComponent : Component
    {
        internal GameTime GameTime = new GameTime();
        internal ResolutionMouseProvider MouseProvider = new ResolutionMouseProvider();
        public UserInterface UserInterface { get; set; } = new UserInterface();
    }
}