namespace MyONez.Base.AdditionalStuff.TurnBase.Components
{
    using LocomotorECS;
    using MyONez.Base.AdditionalStuff.TurnBase;

    public class PlayerTurnComponent : Component
    {
        public ITurnData TurnData;

        public bool TurnMade;
    }
}