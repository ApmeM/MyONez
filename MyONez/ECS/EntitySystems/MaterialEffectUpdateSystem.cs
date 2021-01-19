using System;
using LocomotorECS;
using LocomotorECS.Matching;

using MyONez.ECS.Components;

namespace MyONez.ECS.EntitySystems
{
    public class MaterialEffectUpdateSystem : EntityProcessingSystem
    {
        public MaterialEffectUpdateSystem()
            : base(new Matcher().All(typeof(MaterialComponent)))
        {
        }

        protected override void DoAction(Entity entity, TimeSpan gameTime)
        {
            base.DoAction(entity, gameTime);

            var material = entity.GetComponent<MaterialComponent>();
            material.Material.Update(gameTime);
        }
    }
}