﻿namespace MyONez.Maths.QuadTree
{
    using Microsoft.Xna.Framework;

    /// <summary>
    ///     Interface to define Rect, so that QuadTree knows how to store the object.
    /// </summary>
    public interface IQuadTreeStorable
    {
        /// <summary>
        ///     The rectangle that defines the object's boundaries.
        /// </summary>
        Rectangle Bounds { get; }
    }
}