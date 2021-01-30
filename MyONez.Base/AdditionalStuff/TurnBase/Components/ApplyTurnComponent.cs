namespace MyONez.Base.AdditionalStuff.TurnBase.Components
{
    using LocomotorECS;
    using MyONez.Base.AdditionalStuff.TurnBase;
    using System.Collections.Generic;

    public class ApplyTurnComponent : Component
    {
        public List<ITurnData> TurnsData = new List<ITurnData>();

        public bool TurnApplied = true;
    }
}