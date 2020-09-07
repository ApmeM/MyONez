namespace BrainAI.ECS.EntitySystems
{
    using System;

    using BrainAI.ECS.Components;

    using LocomotorECS;
    using LocomotorECS.Matching;

    public class AIUpdateSystem : EntityProcessingSystem
    {
        public AIUpdateSystem()
            : base(new Matcher().All(typeof(AIComponent)))
        {
        }

        protected override void DoAction(Entity entity, TimeSpan gameTime)
        {
            base.DoAction(entity, gameTime);
            var ai = entity.GetComponent<AIComponent>();
            ai.AIBot.Tick();
        }
    }
}