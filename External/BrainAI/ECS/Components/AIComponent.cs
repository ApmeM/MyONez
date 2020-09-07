namespace BrainAI.ECS.Components
{
    using BrainAI.AI;

    using LocomotorECS;

    public class AIComponent : Component
    {
        public IAITurn AIBot { get; set; }
    }
}