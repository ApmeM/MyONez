namespace MyONez.AdditionalContent.RenderProcessors
{
    using MyONez.AdditionalContent.Effects;
    using SpineEngine;
    using SpineEngine.Graphics.RenderProcessors;

    public class ScanlinesRenderProcessor : RenderProcessor<ScanlinesEffect>
    {
        public ScanlinesRenderProcessor(int executionOrder)
            : base(executionOrder, Core.Instance.Content.Load<ScanlinesEffect>(ScanlinesEffect.EffectAssetName))
        {
        }
    }
}