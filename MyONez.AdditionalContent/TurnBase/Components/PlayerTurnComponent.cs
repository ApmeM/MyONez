namespace MyONez.AdditionalContent.TurnBase.Components
{
    using LocomotorECS;
    using MyONez.AdditionalContent.TurnBase;

    public class PlayerTurnComponent : Component
    {
        public ITurnData TurnData;

        public bool TurnMade;
    }
}