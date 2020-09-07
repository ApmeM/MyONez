﻿namespace MyONez.AdditionalContent.SceneTransitions
{
    using System;
    using System.Collections;

    using Microsoft.Xna.Framework;
    using Microsoft.Xna.Framework.Graphics;

    using MyONez.GlobalManagers.Coroutines;
    using MyONez.Graphics;
    using MyONez.Graphics.Transitions;
    using MyONez.Maths.Easing;

    public class FadeTransition : SceneTransition
    {
        public float DelayBeforeFadeInDuration = 0.2f;

        public EaseType FadeEaseType = EaseType.Linear;

        public float FadeInDuration = 0.8f;

        public float FadeOutDuration = 0.8f;

        public Color FadeToColor = Color.Black;

        private Color fromColor = Color.White;

        private Texture2D overlayTexture;

        private Color toColor = Color.Transparent;

        private Color color;

        public override IEnumerator OnBeginTransition()
        {
            this.overlayTexture = Graphic.CreateSingleColorTexture(1, 1, this.FadeToColor);

            var startAt = DateTime.Now;
            while ((DateTime.Now - startAt).TotalSeconds < this.FadeOutDuration)
            {
                var elapsed = (float)(DateTime.Now - startAt).TotalSeconds;
                this.color = Lerps.Ease(
                    this.FadeEaseType,
                    ref this.fromColor,
                    ref this.toColor,
                    elapsed,
                    this.FadeOutDuration);

                yield return null;
            }

            this.SetNextScene();

            yield return DefaultCoroutines.Wait(this.DelayBeforeFadeInDuration);

            startAt = DateTime.Now;
            while ((DateTime.Now - startAt).TotalSeconds < this.FadeInDuration)
            {
                var elapsed = (float)(DateTime.Now - startAt).TotalSeconds;
                this.color = Lerps.Ease(
                    EaseHelper.OppositeEaseType(this.FadeEaseType),
                    ref this.toColor,
                    ref this.fromColor,
                    elapsed,
                    this.FadeInDuration);

                yield return null;
            }

            this.TransitionComplete();
            this.overlayTexture.Dispose();
        }

        public override void Render()
        {
            this.Batch.Clear();
            this.Batch.Draw(
                this.PreviousSceneRender,
                this.PreviousSceneRender.Bounds,
                this.PreviousSceneRender.Bounds,
                this.color,
                0);

            this.Material.Effect = this.Effect;

            Graphic.Draw(null, Color.Black, this.Batch, this.Material);
        }
    }
}