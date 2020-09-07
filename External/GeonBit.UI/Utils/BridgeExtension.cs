namespace GeonBit.UI
{
#if Bridge
    using System;

    using Bridge;

    using Microsoft.Xna.Framework;
    using Microsoft.Xna.Framework.Graphics;

    using MyONez.Graphics.Meshes;
    using MyONez.Maths;

    public static class BridgeExtension
    {
        public static string ToLowerInvariant(this string value)
        {
            return value.ToLower();
        }
    }
#endif
}