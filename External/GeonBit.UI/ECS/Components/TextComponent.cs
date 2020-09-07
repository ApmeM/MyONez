namespace GeonBit.UI.ECS.Components
{
    using GeonBit.UI.Entities;

    using LocomotorECS;

    public class TextComponent : Component
    {
        public string Text { get; set; }

        internal Label Label { get; set; }
    }
}