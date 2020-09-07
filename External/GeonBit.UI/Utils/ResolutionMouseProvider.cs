#region File Description
//-----------------------------------------------------------------------------
// Helper utility that implements default mouse and keyboard input for GeonBit.UI.
// You can create your own mouse/keyboard inputs to replace this.
//
// Author: Ronen Ness.
// Since: 2016.
//-----------------------------------------------------------------------------
#endregion
using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Input;

namespace GeonBit.UI
{
    public class ResolutionMouseProvider : IMouseInput
    {
        public struct State
        {
            public float X { get; set; }

            public float Y { get; set; }

            public ButtonState LeftButton { get; set; }

            public ButtonState RightButton { get; set; }

            public ButtonState MiddleButton { get; set; }

            public int ScrollWheelValue { get; set; }
        }

        internal State _newMouseState;
        internal State _oldMouseState;

        Vector2 _newMousePos;
        Vector2 _oldMousePos;

        public int MouseWheel { get; private set; }

        public int MouseWheelChange { get; private set; }
        
        public void Update(GameTime gameTime)
        {
            // get mouse position
            _oldMousePos = _newMousePos;
            _newMousePos = new Vector2(_newMouseState.X, _newMouseState.Y);

            // get mouse wheel state
            int prevMouseWheel = MouseWheel;
            MouseWheel = _newMouseState.ScrollWheelValue;
            MouseWheelChange = System.Math.Sign((double)MouseWheel - prevMouseWheel);
        }

        public void UpdateMousePosition(Vector2 pos)
        {
            // move mouse position back to center
            Mouse.SetPosition((int)pos.X, (int)pos.Y);
            _newMousePos = _oldMousePos = pos;
        }

        public Vector2 TransformMousePosition(Matrix? transform)
        {
            var newMousePos = _newMousePos;
            if (transform != null)
            {
                return Vector2.Transform(newMousePos, transform.Value) - new Vector2(transform.Value.Translation.X, transform.Value.Translation.Y);
            }
            return newMousePos;
        }

        public Vector2 MousePosition
        {
            get { return _newMousePos; }
        }

        public Vector2 MousePositionDiff
        {
            get { return _newMousePos - _oldMousePos; }
        }

        public bool MouseButtonDown(MouseButton button = MouseButton.Left)
        {
            return GetMouseButtonState(button) == ButtonState.Pressed;
        }

        public bool AnyMouseButtonDown()
        {
            return MouseButtonDown(MouseButton.Left) ||
                MouseButtonDown(MouseButton.Right) ||
                MouseButtonDown(MouseButton.Middle);
        }

        public bool MouseButtonReleased(MouseButton button = MouseButton.Left)
        {
            return GetMouseButtonState(button) == ButtonState.Released && GetMousePreviousButtonState(button) == ButtonState.Pressed;
        }

        public bool AnyMouseButtonReleased()
        {
            return MouseButtonReleased(MouseButton.Left) ||
                MouseButtonReleased(MouseButton.Right) ||
                MouseButtonReleased(MouseButton.Middle);
        }

        public bool MouseButtonPressed(MouseButton button = MouseButton.Left)
        {
            return GetMouseButtonState(button) == ButtonState.Pressed && GetMousePreviousButtonState(button) == ButtonState.Released;
        }

        public bool AnyMouseButtonPressed()
        {
            return MouseButtonPressed(MouseButton.Left) ||
                MouseButtonPressed(MouseButton.Right) ||
                MouseButtonPressed(MouseButton.Middle);
        }

        public bool MouseButtonClick(MouseButton button = MouseButton.Left)
        {
            return GetMouseButtonState(button) == ButtonState.Released && GetMousePreviousButtonState(button) == ButtonState.Pressed;
        }

        public bool AnyMouseButtonClicked()
        {
            return
                MouseButtonClick(MouseButton.Left) ||
                MouseButtonClick(MouseButton.Right) ||
                MouseButtonClick(MouseButton.Middle);
        }

        private ButtonState GetMouseButtonState(MouseButton button = MouseButton.Left)
        {
            switch (button)
            {
                case MouseButton.Left:
                    return _newMouseState.LeftButton;
                case MouseButton.Right:
                    return _newMouseState.RightButton;
                case MouseButton.Middle:
                    return _newMouseState.MiddleButton;
            }
            return ButtonState.Released;
        }

        private ButtonState GetMousePreviousButtonState(MouseButton button = MouseButton.Left)
        {
            switch (button)
            {
                case MouseButton.Left:
                    return _oldMouseState.LeftButton;
                case MouseButton.Right:
                    return _oldMouseState.RightButton;
                case MouseButton.Middle:
                    return _oldMouseState.MiddleButton;
            }
            return ButtonState.Released;
        }
    }
}
