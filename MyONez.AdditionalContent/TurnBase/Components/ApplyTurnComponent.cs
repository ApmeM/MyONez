namespace MyONez.AdditionalContent.TurnBase.Components
{
    using LocomotorECS;
    using MyONez.AdditionalContent.TurnBase;
    using System.Collections.Generic;

    public class ApplyTurnComponent : Component
    {
        public List<ITurnData> TurnsData = new List<ITurnData>();

        public bool TurnApplied = true;
    }
}