/**
 * @version 1.0.0
 * @author ApmeM
 * @copyright Copyright ©  2019
 * @compiler Bridge.NET 17.6.0
 */
Bridge.assembly("MyONez.Base", function ($asm, globals) {
    "use strict";

    Bridge.define("MyONez.Base.AdditionalStuff.BrainAI.Components.AIComponent", {
        inherits: [LocomotorECS.Component],
        props: {
            AIBot: null
        }
    });

    Bridge.define("MyONez.Base.AdditionalStuff.BrainAI.EntitySystems.AIUpdateSystem", {
        inherits: [LocomotorECS.EntityProcessingSystem],
        ctors: {
            ctor: function () {
                this.$initialize();
                LocomotorECS.EntityProcessingSystem.ctor.call(this, new LocomotorECS.Matching.Matcher().All([MyONez.Base.AdditionalStuff.BrainAI.Components.AIComponent]));
            }
        },
        methods: {
            DoAction$1: function (entity, gameTime) {
                LocomotorECS.EntityProcessingSystem.prototype.DoAction$1.call(this, entity, gameTime);
                var ai = entity.GetComponent(MyONez.Base.AdditionalStuff.BrainAI.Components.AIComponent);
                ai.AIBot.BrainAI$AI$IAITurn$Tick();
            }
        }
    });

    Bridge.define("MyONez.Base.AdditionalStuff.ClientServer.ITransferMessageParser", {
        $kind: "interface"
    });

    Bridge.define("MyONez.Base.AdditionalStuff.ClientServer.ParserUtils", {
        statics: {
            methods: {
                FindStringifier: function (transferModel, parsers) {
                    for (var j = 0; j < parsers.length; j = (j + 1) | 0) {
                        if (parsers[System.Array.index(j, parsers)].MyONez$Base$AdditionalStuff$ClientServer$ITransferMessageParser$IsStringable(transferModel)) {
                            return parsers[System.Array.index(j, parsers)];
                        }
                    }

                    return null;
                },
                FindParser: function (data, parsers) {
                    for (var j = 0; j < parsers.length; j = (j + 1) | 0) {
                        if (parsers[System.Array.index(j, parsers)].MyONez$Base$AdditionalStuff$ClientServer$ITransferMessageParser$IsParsable(data)) {
                            return parsers[System.Array.index(j, parsers)];
                        }
                    }

                    return null;
                }
            }
        }
    });

    Bridge.define("MyONez.Base.AdditionalStuff.Common.Components.CameraShakeComponent", {
        inherits: [LocomotorECS.Component],
        fields: {
            Camera: null,
            ShakeDegredation: 0,
            ShakeDirection: null,
            ShakeIntensity: 0,
            ShakeOffset: null
        },
        ctors: {
            init: function () {
                this.ShakeDirection = new Microsoft.Xna.Framework.Vector2();
                this.ShakeOffset = new Microsoft.Xna.Framework.Vector2();
                this.ShakeDegredation = 0.95;
            },
            ctor: function (camera) {
                this.$initialize();
                LocomotorECS.Component.ctor.call(this);
                this.Camera = camera;
            }
        },
        methods: {
            /**
             * if the shake is already running this will overwrite the current values only if shakeIntensity &gt; the current
                 shakeIntensity.
                 if the shake is not currently active it will be started.
             *
             * @instance
             * @public
             * @this MyONez.Base.AdditionalStuff.Common.Components.CameraShakeComponent
             * @memberof MyONez.Base.AdditionalStuff.Common.Components.CameraShakeComponent
             * @param   {number}                             shakeIntensity      how much should we shake it
             * @param   {number}                             shakeDegredation    higher values cause faster degradation
             * @param   {Microsoft.Xna.Framework.Vector2}    shakeDirection      Vector3.zero will result in a shake on just the x/y axis. any other values will result in the passed
                 in shakeDirection * intensity being the offset the camera is moved
             * @return  {void}
             */
            Shake: function (shakeIntensity, shakeDegredation, shakeDirection) {
                if (shakeIntensity === void 0) { shakeIntensity = 15.0; }
                if (shakeDegredation === void 0) { shakeDegredation = 0.9; }
                if (shakeDirection === void 0) { shakeDirection = new Microsoft.Xna.Framework.Vector2(); }
                this.Enabled = true;
                if (this.ShakeIntensity >= shakeIntensity) {
                    return;
                }

                this.ShakeDirection = shakeDirection.$clone();
                this.ShakeIntensity = shakeIntensity;
                if (shakeDegredation < 0.0 || shakeDegredation >= 1.0) {
                    shakeDegredation = 0.95;
                }

                this.ShakeDegredation = shakeDegredation;
            }
        }
    });

    Bridge.define("MyONez.Base.AdditionalStuff.Common.Components.ColorCyclerComponent", {
        inherits: [LocomotorECS.Component],
        fields: {
            AffectsIntensity: false,
            /**
             * this value is multiplied by the calculated value
             *
             * @instance
             * @public
             * @memberof MyONez.Base.AdditionalStuff.Common.Components.ColorCyclerComponent
             * @default 1.0
             * @type number
             */
            Amplitude: 0,
            ColorChannel: 0,
            /**
             * cycles per second
             *
             * @instance
             * @public
             * @memberof MyONez.Base.AdditionalStuff.Common.Components.ColorCyclerComponent
             * @default 0.5
             * @type number
             */
            Frequency: 0,
            /**
             * This value is added to the final result. 0 - 1 range.
             *
             * @instance
             * @public
             * @memberof MyONez.Base.AdditionalStuff.Common.Components.ColorCyclerComponent
             * @default 0.0
             * @type number
             */
            Offset: 0,
            OriginalColor: null,
            /**
             * start point in wave function. 0 - 1 range.
             *
             * @instance
             * @public
             * @memberof MyONez.Base.AdditionalStuff.Common.Components.ColorCyclerComponent
             * @default 0.0
             * @type number
             */
            Phase: 0,
            WaveFunction: 0
        },
        ctors: {
            init: function () {
                this.AffectsIntensity = true;
                this.Amplitude = 1.0;
                this.ColorChannel = MyONez.Base.AdditionalStuff.Common.Components.ColorCyclerComponent.ColorChannels.All;
                this.Frequency = 0.5;
                this.Offset = 0.0;
                this.Phase = 0.0;
                this.WaveFunction = MyONez.Base.AdditionalStuff.Common.Components.ColorCyclerComponent.WaveFunctions.Sin;
            }
        }
    });

    Bridge.define("MyONez.Base.AdditionalStuff.Common.Components.ColorCyclerComponent.ColorChannels", {
        $kind: "nested enum",
        statics: {
            fields: {
                None: 0,
                All: 1,
                Red: 2,
                Green: 3,
                Blue: 4
            }
        }
    });

    Bridge.define("MyONez.Base.AdditionalStuff.Common.Components.ColorCyclerComponent.WaveFunctions", {
        $kind: "nested enum",
        statics: {
            fields: {
                Sin: 0,
                Triangle: 1,
                Square: 2,
                SawTooth: 3,
                InvertedSawTooth: 4,
                Random: 5
            }
        }
    });

    Bridge.define("MyONez.Base.AdditionalStuff.Common.Components.FollowCameraComponent", {
        inherits: [LocomotorECS.Component],
        fields: {
            DesiredPosition: null,
            /**
             * how fast the camera closes the distance to the target position
             *
             * @instance
             * @public
             * @memberof MyONez.Base.AdditionalStuff.Common.Components.FollowCameraComponent
             * @default 0.2
             * @type number
             */
            FollowLerp: 0
        },
        props: {
            Camera: null
        },
        ctors: {
            init: function () {
                this.DesiredPosition = new Microsoft.Xna.Framework.Vector2();
                this.FollowLerp = 0.2;
            },
            ctor: function (camera) {
                this.$initialize();
                LocomotorECS.Component.ctor.call(this);
                this.Camera = camera;
            }
        }
    });

    Bridge.define("MyONez.Base.AdditionalStuff.Common.Components.FollowCursorComponent", {
        inherits: [LocomotorECS.Component]
    });

    Bridge.define("MyONez.Base.AdditionalStuff.Common.EntitySystems.CameraShakeUpdateSystem", {
        inherits: [LocomotorECS.EntityProcessingSystem],
        ctors: {
            ctor: function () {
                this.$initialize();
                LocomotorECS.EntityProcessingSystem.ctor.call(this, new LocomotorECS.Matching.Matcher().All([MyONez.Base.AdditionalStuff.Common.Components.CameraShakeComponent]));
            }
        },
        methods: {
            DoAction$1: function (entity, gameTime) {
                LocomotorECS.EntityProcessingSystem.prototype.DoAction$1.call(this, entity, gameTime);

                var shake = entity.GetComponent(MyONez.Base.AdditionalStuff.Common.Components.CameraShakeComponent);

                if (!shake.Enabled) {
                    return;
                }

                if (Math.abs(shake.ShakeIntensity) > 0.0) {
                    shake.ShakeOffset = shake.ShakeDirection.$clone();
                    if (shake.ShakeOffset.X !== 0.0 || shake.ShakeOffset.Y !== 0.0) {
                        shake.ShakeOffset.Normalize();
                    } else {
                        shake.ShakeOffset.X = shake.ShakeOffset.X + FateRandom.Fate.GlobalFate.NextFloat() - 0.5;
                        shake.ShakeOffset.Y = shake.ShakeOffset.Y + FateRandom.Fate.GlobalFate.NextFloat() - 0.5;
                    }

                    // ToDo: this needs to be multiplied by camera zoom so that less shake gets applied when zoomed in
                    shake.ShakeOffset = Microsoft.Xna.Framework.Vector2.op_Multiply$1(shake.ShakeOffset.$clone(), shake.ShakeIntensity);
                    shake.ShakeIntensity *= -shake.ShakeDegredation;
                    if (Math.abs(shake.ShakeIntensity) <= 0.01) {
                        shake.ShakeIntensity = 0.0;
                        shake.Enabled = false;
                    }
                }

                shake.Camera.Position = Microsoft.Xna.Framework.Vector2.op_Addition(shake.Camera.Position.$clone(), shake.ShakeOffset.$clone());
            }
        }
    });

    /** @namespace MyONez.Base.AdditionalStuff.Common.EntitySystems */

    /**
     * Takes a ColorComponent and cycles the color using different wave forms. 
         A specific color channel can be affected or all of them.
         Useful for making flickering lights and adding atmosphere.
     *
     * @public
     * @class MyONez.Base.AdditionalStuff.Common.EntitySystems.ColorCyclerUpdateSystem
     * @augments LocomotorECS.EntityProcessingSystem
     */
    Bridge.define("MyONez.Base.AdditionalStuff.Common.EntitySystems.ColorCyclerUpdateSystem", {
        inherits: [LocomotorECS.EntityProcessingSystem],
        ctors: {
            ctor: function () {
                this.$initialize();
                LocomotorECS.EntityProcessingSystem.ctor.call(this, new LocomotorECS.Matching.Matcher().All([SpineEngine.ECS.Components.ColorComponent, MyONez.Base.AdditionalStuff.Common.Components.ColorCyclerComponent]));
            }
        },
        methods: {
            DoAction$1: function (entity, gameTime) {
                var $t;
                LocomotorECS.EntityProcessingSystem.prototype.DoAction$1.call(this, entity, gameTime);

                var color = entity.GetComponent(SpineEngine.ECS.Components.ColorComponent);
                var colorCycler = entity.GetComponent(MyONez.Base.AdditionalStuff.Common.Components.ColorCyclerComponent);
                colorCycler.OriginalColor = ($t = colorCycler.OriginalColor, $t != null ? $t : color.Color);

                var newColor = new Microsoft.Xna.Framework.Color();
                switch (colorCycler.ColorChannel) {
                    case MyONez.Base.AdditionalStuff.Common.Components.ColorCyclerComponent.ColorChannels.All: 
                        newColor = Microsoft.Xna.Framework.Color.op_Multiply(System.Nullable.getValue(colorCycler.OriginalColor).$clone(), this.EvaluateWaveFunction(gameTime.getTotalSeconds(), colorCycler));
                        break;
                    case MyONez.Base.AdditionalStuff.Common.Components.ColorCyclerComponent.ColorChannels.Red: 
                        newColor = new Microsoft.Xna.Framework.Color.$ctor7(Bridge.Int.clip32(System.Nullable.getValue(colorCycler.OriginalColor).R * this.EvaluateWaveFunction(gameTime.getTotalSeconds(), colorCycler)), System.Nullable.getValue(colorCycler.OriginalColor).G, System.Nullable.getValue(colorCycler.OriginalColor).B, System.Nullable.getValue(colorCycler.OriginalColor).A);
                        break;
                    case MyONez.Base.AdditionalStuff.Common.Components.ColorCyclerComponent.ColorChannels.Green: 
                        newColor = new Microsoft.Xna.Framework.Color.$ctor7(System.Nullable.getValue(colorCycler.OriginalColor).R, Bridge.Int.clip32(System.Nullable.getValue(colorCycler.OriginalColor).G * this.EvaluateWaveFunction(gameTime.getTotalSeconds(), colorCycler)), System.Nullable.getValue(colorCycler.OriginalColor).B, System.Nullable.getValue(colorCycler.OriginalColor).A);
                        break;
                    case MyONez.Base.AdditionalStuff.Common.Components.ColorCyclerComponent.ColorChannels.Blue: 
                        newColor = new Microsoft.Xna.Framework.Color.$ctor7(System.Nullable.getValue(colorCycler.OriginalColor).R, System.Nullable.getValue(colorCycler.OriginalColor).G, Bridge.Int.clip32(System.Nullable.getValue(colorCycler.OriginalColor).B * this.EvaluateWaveFunction(gameTime.getTotalSeconds(), colorCycler)), System.Nullable.getValue(colorCycler.OriginalColor).A);
                        break;
                    default: 
                        newColor = color.Color.$clone();
                        break;
                }

                if (colorCycler.AffectsIntensity) {
                    newColor.A = Bridge.Int.clipu8(System.Nullable.getValue(colorCycler.OriginalColor).A * this.EvaluateWaveFunction(gameTime.getTotalSeconds(), colorCycler));
                } else {
                    newColor.A = System.Nullable.getValue(colorCycler.OriginalColor).A;
                }

                color.Color = newColor.$clone();
            },
            EvaluateWaveFunction: function (secondsPassed, colorCycler) {
                var t = (secondsPassed + colorCycler.Phase) * colorCycler.Frequency;
                t = t - SpineEngine.Maths.Mathf.Floor(t); // normalized value (0..1)
                var y = 1.0;

                switch (colorCycler.WaveFunction) {
                    case MyONez.Base.AdditionalStuff.Common.Components.ColorCyclerComponent.WaveFunctions.Sin: 
                        y = SpineEngine.Maths.Mathf.Sin(1.0 * t * Microsoft.Xna.Framework.MathHelper.Pi);
                        break;
                    case MyONez.Base.AdditionalStuff.Common.Components.ColorCyclerComponent.WaveFunctions.Triangle: 
                        if (t < 0.5) {
                            y = 4.0 * t - 1.0;
                        } else {
                            y = -4.0 * t + 3.0;
                        }
                        break;
                    case MyONez.Base.AdditionalStuff.Common.Components.ColorCyclerComponent.WaveFunctions.Square: 
                        if (t < 0.5) {
                            y = 1.0;
                        } else {
                            y = -1.0;
                        }
                        break;
                    case MyONez.Base.AdditionalStuff.Common.Components.ColorCyclerComponent.WaveFunctions.SawTooth: 
                        y = t;
                        break;
                    case MyONez.Base.AdditionalStuff.Common.Components.ColorCyclerComponent.WaveFunctions.InvertedSawTooth: 
                        y = 1.0 - t;
                        break;
                    case MyONez.Base.AdditionalStuff.Common.Components.ColorCyclerComponent.WaveFunctions.Random: 
                        y = 1.0 - FateRandom.Fate.GlobalFate.NextFloat() * 2.0;
                        break;
                }

                return y * colorCycler.Amplitude + colorCycler.Offset;
            }
        }
    });

    Bridge.define("MyONez.Base.AdditionalStuff.Common.EntitySystems.FollowCameraUpdateSystem", {
        inherits: [LocomotorECS.EntityProcessingSystem],
        ctors: {
            ctor: function () {
                this.$initialize();
                LocomotorECS.EntityProcessingSystem.ctor.call(this, new LocomotorECS.Matching.Matcher().All([MyONez.Base.AdditionalStuff.Common.Components.FollowCameraComponent]));
            }
        },
        methods: {
            DoAction$1: function (entity, gameTime) {
                LocomotorECS.EntityProcessingSystem.prototype.DoAction$1.call(this, entity, gameTime);

                var follow = entity.GetComponent(MyONez.Base.AdditionalStuff.Common.Components.FollowCameraComponent);

                this.UpdateFollow(entity);

                follow.Camera.Position = Microsoft.Xna.Framework.Vector2.Lerp(follow.Camera.Position.$clone(), follow.DesiredPosition.$clone(), follow.FollowLerp);

                follow.Camera.Position = new Microsoft.Xna.Framework.Vector2.$ctor2(Bridge.Math.round(follow.Camera.Position.X, 0, 6), Bridge.Math.round(follow.Camera.Position.Y, 0, 6));
            },
            UpdateFollow: function (entity) {
                var follow = entity.GetComponent(MyONez.Base.AdditionalStuff.Common.Components.FollowCameraComponent);

                follow.DesiredPosition.X = (follow.DesiredPosition.Y = 0, 0);

                var transform = SpineEngine.Maths.TransformationUtils.GetTransformation(entity);

                follow.DesiredPosition.X = transform.Position.X;
                follow.DesiredPosition.Y = transform.Position.Y;
            }
        }
    });

    Bridge.define("MyONez.Base.AdditionalStuff.Common.EntitySystems.FollowCursorUpdateSystem", {
        inherits: [LocomotorECS.EntityProcessingSystem],
        fields: {
            scene: null
        },
        ctors: {
            ctor: function (scene) {
                this.$initialize();
                LocomotorECS.EntityProcessingSystem.ctor.call(this, new LocomotorECS.Matching.Matcher().All([MyONez.Base.AdditionalStuff.Common.Components.FollowCursorComponent]));
                this.scene = scene;
            }
        },
        methods: {
            DoAction$1: function (entity, gameTime) {
                LocomotorECS.EntityProcessingSystem.prototype.DoAction$1.call(this, entity, gameTime);

                var pos = entity.GetOrCreateComponent(SpineEngine.ECS.Components.PositionComponent);
                var mouse = entity.GetOrCreateComponent(SpineEngine.ECS.Components.InputMouseComponent);
                var touch = entity.GetOrCreateComponent(SpineEngine.ECS.Components.InputTouchComponent);

                if (System.Linq.Enumerable.from(touch.CurrentTouches).any()) {
                    pos.Position = touch.GetScaledPosition(System.Linq.Enumerable.from(touch.CurrentTouches).first().Position.$clone());
                } else {
                    pos.Position = mouse.MousePosition.$clone();
                }

                pos.Position = this.scene.Camera.ScreenToWorldPoint$1(pos.Position.$clone());
            }
        }
    });

    Bridge.define("MyONez.Base.AdditionalStuff.ContentPaths", {
        statics: {
            fields: {
                content: null
            },
            ctors: {
                init: function () {
                    this.content = "Content";
                }
            }
        }
    });

    Bridge.define("MyONez.Base.AdditionalStuff.ContentPaths.Effects", {
        $kind: "nested class",
        statics: {
            fields: {
                bevels: null,
                bloomCombine: null,
                bloomExtract: null,
                crosshatch: null,
                deferredLighting: null,
                deferredSprite: null,
                dissolve: null,
                dots: null,
                forwardLighting: null,
                gaussianBlur: null,
                grayscale: null,
                heatDistortion: null,
                invert: null,
                letterbox: null,
                multiTexture: null,
                multiTextureOverlay: null,
                noise: null,
                paletteCycler: null,
                pixelGlitch: null,
                polygonLight: null,
                reflection: null,
                scanlines: null,
                sepia: null,
                spriteAlphaTest: null,
                spriteBlinkEffect: null,
                spriteLightMultiply: null,
                spriteLines: null,
                squares: null,
                textureWipe: null,
                twist: null,
                vignette: null,
                wind: null
            },
            ctors: {
                init: function () {
                    this.bevels = "effects/Bevels";
                    this.bloomCombine = "effects/BloomCombine";
                    this.bloomExtract = "effects/BloomExtract";
                    this.crosshatch = "effects/Crosshatch";
                    this.deferredLighting = "effects/DeferredLighting";
                    this.deferredSprite = "effects/DeferredSprite";
                    this.dissolve = "effects/Dissolve";
                    this.dots = "effects/Dots";
                    this.forwardLighting = "effects/ForwardLighting";
                    this.gaussianBlur = "effects/GaussianBlur";
                    this.grayscale = "effects/Grayscale";
                    this.heatDistortion = "effects/HeatDistortion";
                    this.invert = "effects/Invert";
                    this.letterbox = "effects/Letterbox";
                    this.multiTexture = "effects/MultiTexture";
                    this.multiTextureOverlay = "effects/MultiTextureOverlay";
                    this.noise = "effects/Noise";
                    this.paletteCycler = "effects/PaletteCycler";
                    this.pixelGlitch = "effects/PixelGlitch";
                    this.polygonLight = "effects/PolygonLight";
                    this.reflection = "effects/Reflection";
                    this.scanlines = "effects/Scanlines";
                    this.sepia = "effects/Sepia";
                    this.spriteAlphaTest = "effects/SpriteAlphaTest";
                    this.spriteBlinkEffect = "effects/SpriteBlinkEffect";
                    this.spriteLightMultiply = "effects/SpriteLightMultiply";
                    this.spriteLines = "effects/SpriteLines";
                    this.squares = "effects/Squares";
                    this.textureWipe = "effects/TextureWipe";
                    this.twist = "effects/Twist";
                    this.vignette = "effects/Vignette";
                    this.wind = "effects/Wind";
                }
            }
        }
    });

    Bridge.define("MyONez.Base.AdditionalStuff.ContentPaths.Textures", {
        $kind: "nested class",
        statics: {
            fields: {
                heatDistortionNoise: null
            },
            ctors: {
                init: function () {
                    this.heatDistortionNoise = "textures/heatDistortionNoise";
                }
            }
        }
    });

    Bridge.define("MyONez.Base.AdditionalStuff.ContentPaths.Textures.TextureWipeTransition", {
        $kind: "nested class",
        statics: {
            fields: {
                angular: null,
                crissCross: null,
                diagonalDistort: null,
                horizontal: null,
                noise: null,
                pokemon: null,
                sawTooth: null,
                spiral: null,
                wink: null
            },
            ctors: {
                init: function () {
                    this.angular = "textures/textureWipeTransition/angular";
                    this.crissCross = "textures/textureWipeTransition/crissCross";
                    this.diagonalDistort = "textures/textureWipeTransition/diagonalDistort";
                    this.horizontal = "textures/textureWipeTransition/horizontal";
                    this.noise = "textures/textureWipeTransition/noise";
                    this.pokemon = "textures/textureWipeTransition/pokemon";
                    this.sawTooth = "textures/textureWipeTransition/sawTooth";
                    this.spiral = "textures/textureWipeTransition/spiral";
                    this.wink = "textures/textureWipeTransition/wink";
                }
            }
        }
    });

    Bridge.define("MyONez.Base.AdditionalStuff.Effects.BevelsEffect", {
        inherits: [Microsoft.Xna.Framework.Graphics.Effect],
        statics: {
            fields: {
                EffectAssetName: null
            },
            ctors: {
                init: function () {
                    this.EffectAssetName = "effects/Bevels";
                }
            }
        },
        ctors: {
            ctor: function (effect) {
                this.$initialize();
                Microsoft.Xna.Framework.Graphics.Effect.ctor.call(this, effect);
            }
        }
    });

    Bridge.define("MyONez.Base.AdditionalStuff.Effects.BloomCombineEffect", {
        inherits: [Microsoft.Xna.Framework.Graphics.Effect],
        statics: {
            fields: {
                EffectAssetName: null
            },
            ctors: {
                init: function () {
                    this.EffectAssetName = "effects/BloomCombine";
                }
            }
        },
        fields: {
            baseIntensityParam: null,
            baseMapParam: null,
            baseSaturationParam: null,
            bloomIntensityParam: null,
            bloomSaturationParam: null
        },
        props: {
            BloomIntensity: {
                get: function () {
                    return this.bloomIntensityParam.GetValueSingle();
                },
                set: function (value) {
                    this.bloomIntensityParam.SetValue$12(value);
                }
            },
            BaseIntensity: {
                get: function () {
                    return this.baseIntensityParam.GetValueSingle();
                },
                set: function (value) {
                    this.baseIntensityParam.SetValue$12(value);
                }
            },
            BloomSaturation: {
                get: function () {
                    return this.bloomSaturationParam.GetValueSingle();
                },
                set: function (value) {
                    this.bloomSaturationParam.SetValue$12(value);
                }
            },
            BaseSaturation: {
                get: function () {
                    return this.baseSaturationParam.GetValueSingle();
                },
                set: function (value) {
                    this.baseSaturationParam.SetValue$12(value);
                }
            },
            BaseMap: {
                get: function () {
                    return this.baseMapParam.GetValueTexture2D();
                },
                set: function (value) {
                    this.baseMapParam.SetValue(value);
                }
            }
        },
        ctors: {
            ctor: function (effect) {
                this.$initialize();
                Microsoft.Xna.Framework.Graphics.Effect.ctor.call(this, effect);
                this.bloomIntensityParam = this.Parameters.getItem$1("_bloomIntensity");
                this.baseIntensityParam = this.Parameters.getItem$1("_baseIntensity");
                this.bloomSaturationParam = this.Parameters.getItem$1("_bloomSaturation");
                this.baseSaturationParam = this.Parameters.getItem$1("_baseSaturation");
                this.baseMapParam = this.Parameters.getItem$1("_baseMap");
            }
        }
    });

    Bridge.define("MyONez.Base.AdditionalStuff.Effects.BloomExtractEffect", {
        inherits: [Microsoft.Xna.Framework.Graphics.Effect],
        statics: {
            fields: {
                EffectAssetName: null
            },
            ctors: {
                init: function () {
                    this.EffectAssetName = "effects/BloomExtract";
                }
            }
        },
        fields: {
            bloomThresholdParam: null
        },
        props: {
            BloomThreshold: {
                get: function () {
                    return this.bloomThresholdParam.GetValueSingle();
                },
                set: function (value) {
                    this.bloomThresholdParam.SetValue$12(value);
                }
            }
        },
        ctors: {
            ctor: function (effect) {
                this.$initialize();
                Microsoft.Xna.Framework.Graphics.Effect.ctor.call(this, effect);
                this.bloomThresholdParam = this.Parameters.getItem$1("_bloomThreshold");
            }
        }
    });

    Bridge.define("MyONez.Base.AdditionalStuff.Effects.CrosshatchEffect", {
        inherits: [Microsoft.Xna.Framework.Graphics.Effect],
        statics: {
            fields: {
                EffectAssetName: null
            },
            ctors: {
                init: function () {
                    this.EffectAssetName = "effects/Crosshatch";
                }
            }
        },
        fields: {
            crosshatchSizeParam: null
        },
        props: {
            CrosshatchSize: {
                get: function () {
                    return this.crosshatchSizeParam.GetValueInt32();
                },
                set: function (value) {
                    if (!SpineEngine.Maths.Mathf.IsEven(value)) {
                        value = (value + 1) | 0;
                    }

                    this.crosshatchSizeParam.SetValue$11(value);
                }
            }
        },
        ctors: {
            ctor: function (effect) {
                this.$initialize();
                Microsoft.Xna.Framework.Graphics.Effect.ctor.call(this, effect);
                this.crosshatchSizeParam = this.Parameters.getItem$1("crossHatchSize");
                this.CrosshatchSize = 16;
            }
        }
    });

    Bridge.define("MyONez.Base.AdditionalStuff.Effects.DeferredLightingEffect", {
        inherits: [Microsoft.Xna.Framework.Graphics.Effect],
        statics: {
            fields: {
                EffectAssetName: null
            },
            ctors: {
                init: function () {
                    this.EffectAssetName = "effects/DeferredLighting";
                }
            }
        },
        ctors: {
            ctor: function (effect) {
                this.$initialize();
                Microsoft.Xna.Framework.Graphics.Effect.ctor.call(this, effect);
            }
        }
    });

    Bridge.define("MyONez.Base.AdditionalStuff.Effects.DeferredSpriteEffect", {
        inherits: [Microsoft.Xna.Framework.Graphics.Effect],
        statics: {
            fields: {
                EffectAssetName: null
            },
            ctors: {
                init: function () {
                    this.EffectAssetName = "effects/DeferredSprite";
                }
            }
        },
        fields: {
            alphaAsSelfIlluminationParam: null,
            alphaCutoffParam: null,
            normalMapParam: null,
            selfIlluminationPowerParam: null
        },
        props: {
            AlphaCutoff: {
                get: function () {
                    return this.alphaCutoffParam.GetValueSingle();
                },
                set: function (value) {
                    this.alphaCutoffParam.SetValue$12(value);
                }
            },
            NormalMap: {
                get: function () {
                    return this.normalMapParam.GetValueTexture2D();
                },
                set: function (value) {
                    this.normalMapParam.SetValue(value);
                }
            },
            UseNormalAlphaChannelForSelfIllumination: {
                get: function () {
                    return this.alphaAsSelfIlluminationParam.GetValueSingle() === 1.0;
                },
                set: function (value) {
                    this.alphaAsSelfIlluminationParam.SetValue$12(value ? 1.0 : 0.0);
                }
            },
            SelfIlluminationPower: {
                get: function () {
                    return this.selfIlluminationPowerParam.GetValueSingle();
                },
                set: function (value) {
                    this.selfIlluminationPowerParam.SetValue$12(value);
                }
            }
        },
        ctors: {
            ctor: function (effect) {
                this.$initialize();
                Microsoft.Xna.Framework.Graphics.Effect.ctor.call(this, effect);
                this.normalMapParam = this.Parameters.getItem$1("_normalMap");
                this.alphaCutoffParam = this.Parameters.getItem$1("_alphaCutoff");
                this.alphaAsSelfIlluminationParam = this.Parameters.getItem$1("_alphaAsSelfIllumination");
                this.selfIlluminationPowerParam = this.Parameters.getItem$1("_selfIlluminationPower");

                this.AlphaCutoff = 0.3;
                this.SelfIlluminationPower = 1;
            }
        }
    });

    Bridge.define("MyONez.Base.AdditionalStuff.Effects.DissolveEffect", {
        inherits: [Microsoft.Xna.Framework.Graphics.Effect],
        statics: {
            fields: {
                EffectAssetName: null
            },
            ctors: {
                init: function () {
                    this.EffectAssetName = "effects/Dissolve";
                }
            }
        },
        fields: {
            dissolveTexParam: null,
            dissolveThresholdColorParam: null,
            dissolveThresholdParam: null,
            progressParam: null
        },
        props: {
            Progress: {
                get: function () {
                    return this.progressParam.GetValueSingle();
                },
                set: function (value) {
                    this.progressParam.SetValue$12(value);
                }
            },
            DissolveThreshold: {
                get: function () {
                    return this.dissolveThresholdParam.GetValueSingle();
                },
                set: function (value) {
                    this.dissolveThresholdParam.SetValue$12(value);
                }
            },
            DissolveThresholdColor: {
                get: function () {
                    return new Microsoft.Xna.Framework.Color.$ctor4(this.dissolveThresholdColorParam.GetValueVector4());
                },
                set: function (value) {
                    this.dissolveThresholdColorParam.SetValue$8(value.ToVector4());
                }
            },
            DissolveTexture: {
                get: function () {
                    return this.dissolveTexParam.GetValueTexture2D();
                },
                set: function (value) {
                    this.dissolveTexParam.SetValue(value);
                }
            }
        },
        ctors: {
            ctor: function (effect) {
                this.$initialize();
                Microsoft.Xna.Framework.Graphics.Effect.ctor.call(this, effect);
                this.progressParam = this.Parameters.getItem$1("_progress");
                this.dissolveThresholdParam = this.Parameters.getItem$1("_dissolveThreshold");
                this.dissolveThresholdColorParam = this.Parameters.getItem$1("_dissolveThresholdColor");
                this.dissolveTexParam = this.Parameters.getItem$1("_dissolveTex");

                this.Progress = 0;
                this.DissolveThreshold = 0.1;
                this.DissolveThresholdColor = Microsoft.Xna.Framework.Color.Red.$clone();
            }
        }
    });

    Bridge.define("MyONez.Base.AdditionalStuff.Effects.DotsEffect", {
        inherits: [Microsoft.Xna.Framework.Graphics.Effect],
        statics: {
            fields: {
                EffectAssetName: null
            },
            ctors: {
                init: function () {
                    this.EffectAssetName = "effects/Dots";
                }
            }
        },
        fields: {
            angleParam: null,
            scaleParam: null
        },
        props: {
            Scale: {
                get: function () {
                    return this.scaleParam.GetValueSingle();
                },
                set: function (value) {
                    this.scaleParam.SetValue$12(value);
                }
            },
            Angle: {
                get: function () {
                    return this.angleParam.GetValueSingle();
                },
                set: function (value) {
                    this.angleParam.SetValue$12(value);
                }
            }
        },
        ctors: {
            ctor: function (effect) {
                this.$initialize();
                Microsoft.Xna.Framework.Graphics.Effect.ctor.call(this, effect);
                this.scaleParam = this.Parameters.getItem$1("scale");
                this.angleParam = this.Parameters.getItem$1("angle");

                this.Scale = 0.5;
                this.Angle = 0.5;
            }
        }
    });

    Bridge.define("MyONez.Base.AdditionalStuff.Effects.ForwardLightingEffect", {
        inherits: [Microsoft.Xna.Framework.Graphics.Effect],
        statics: {
            fields: {
                EffectAssetName: null
            },
            ctors: {
                init: function () {
                    this.EffectAssetName = "effects/ForwardLighting";
                }
            }
        },
        ctors: {
            ctor: function (effect) {
                this.$initialize();
                Microsoft.Xna.Framework.Graphics.Effect.ctor.call(this, effect);
            }
        }
    });

    Bridge.define("MyONez.Base.AdditionalStuff.Effects.GaussianBlurEffect", {
        inherits: [Microsoft.Xna.Framework.Graphics.Effect],
        statics: {
            fields: {
                EffectAssetName: null
            },
            ctors: {
                init: function () {
                    this.EffectAssetName = "effects/GaussianBlur";
                }
            }
        },
        fields: {
            blurOffsetsParam: null,
            blurWeightsParam: null,
            horizontalSampleOffsets: null,
            sampleCount: 0,
            sampleWeights: null,
            verticalSampleOffsets: null,
            blurAmount: 0,
            horizontalBlurDelta: 0,
            verticalBlurDelta: 0
        },
        props: {
            BlurAmount: {
                get: function () {
                    return this.blurAmount;
                },
                set: function (value) {
                    if (this.blurAmount === value) {
                        return;
                    }

                    if (value === 0) {
                        value = 0.001;
                    }

                    this.blurAmount = value;
                    this.CalculateSampleWeights();
                }
            },
            HorizontalBlurDelta: {
                get: function () {
                    return this.horizontalBlurDelta;
                },
                set: function (value) {
                    if (value === this.horizontalBlurDelta) {
                        return;
                    }

                    this.horizontalBlurDelta = value;
                    this.SetBlurEffectParameters(this.horizontalBlurDelta, 0, this.horizontalSampleOffsets);
                }
            },
            VerticalBlurDelta: {
                get: function () {
                    return this.verticalBlurDelta;
                },
                set: function (value) {
                    if (value === this.verticalBlurDelta) {
                        return;
                    }

                    this.verticalBlurDelta = value;
                    this.SetBlurEffectParameters(0, this.verticalBlurDelta, this.verticalSampleOffsets);
                }
            }
        },
        ctors: {
            init: function () {
                this.blurAmount = 2.0;
            },
            ctor: function (effect) {
                this.$initialize();
                Microsoft.Xna.Framework.Graphics.Effect.ctor.call(this, effect);
                this.blurWeightsParam = this.Parameters.getItem$1("_sampleWeights");
                this.blurOffsetsParam = this.Parameters.getItem$1("_sampleOffsets");

                this.sampleCount = this.blurWeightsParam.Elements.Count;

                this.sampleWeights = System.Array.init(this.sampleCount, 0, System.Single);
                this.verticalSampleOffsets = System.Array.init(this.sampleCount, function (){
                    return new Microsoft.Xna.Framework.Vector2();
                }, Microsoft.Xna.Framework.Vector2);
                this.horizontalSampleOffsets = System.Array.init(this.sampleCount, function (){
                    return new Microsoft.Xna.Framework.Vector2();
                }, Microsoft.Xna.Framework.Vector2);

                this.verticalSampleOffsets[System.Array.index(0, this.verticalSampleOffsets)] = Microsoft.Xna.Framework.Vector2.Zero.$clone();
                this.horizontalSampleOffsets[System.Array.index(0, this.horizontalSampleOffsets)] = Microsoft.Xna.Framework.Vector2.Zero.$clone();

                this.CalculateSampleWeights();
            }
        },
        methods: {
            PrepareForHorizontalBlur: function () {
                this.blurOffsetsParam.SetValue$5(this.horizontalSampleOffsets);
            },
            PrepareForVerticalBlur: function () {
                this.blurOffsetsParam.SetValue$5(this.verticalSampleOffsets);
            },
            SetBlurEffectParameters: function (dx, dy, offsets) {
                for (var i = 0; i < ((Bridge.Int.div(this.sampleCount, 2)) | 0); i = (i + 1) | 0) {
                    var sampleOffset = Bridge.Int.mul(i, 2) + 1.5;

                    var delta = Microsoft.Xna.Framework.Vector2.op_Multiply$1(new Microsoft.Xna.Framework.Vector2.$ctor2(dx, dy), sampleOffset);

                    offsets[System.Array.index(((Bridge.Int.mul(i, 2) + 1) | 0), offsets)] = delta.$clone();
                    offsets[System.Array.index(((Bridge.Int.mul(i, 2) + 2) | 0), offsets)] = Microsoft.Xna.Framework.Vector2.op_UnaryNegation(delta.$clone());
                }
            },
            CalculateSampleWeights: function () {
                this.sampleWeights[System.Array.index(0, this.sampleWeights)] = this.ComputeGaussian(0);

                var totalWeights = this.sampleWeights[System.Array.index(0, this.sampleWeights)];

                for (var i = 0; i < ((Bridge.Int.div(this.sampleCount, 2)) | 0); i = (i + 1) | 0) {
                    var weight = this.ComputeGaussian(((i + 1) | 0));

                    this.sampleWeights[System.Array.index(((Bridge.Int.mul(i, 2) + 1) | 0), this.sampleWeights)] = weight;
                    this.sampleWeights[System.Array.index(((Bridge.Int.mul(i, 2) + 2) | 0), this.sampleWeights)] = weight;

                    totalWeights += weight * 2;
                }

                for (var i1 = 0; i1 < this.sampleWeights.length; i1 = (i1 + 1) | 0) {
                    this.sampleWeights[System.Array.index(i1, this.sampleWeights)] /= totalWeights;
                }

                this.blurWeightsParam.SetValue$13(this.sampleWeights);
            },
            ComputeGaussian: function (n) {
                return 1.0 / Math.sqrt(6.2831853071795862 * this.blurAmount) * Math.exp(-(n * n) / (2 * this.blurAmount * this.blurAmount));
            }
        }
    });

    Bridge.define("MyONez.Base.AdditionalStuff.Effects.GrayscaleEffect", {
        inherits: [Microsoft.Xna.Framework.Graphics.Effect],
        statics: {
            fields: {
                EffectAssetName: null
            },
            ctors: {
                init: function () {
                    this.EffectAssetName = "effects/Grayscale";
                }
            }
        },
        ctors: {
            ctor: function (cloneSource) {
                this.$initialize();
                Microsoft.Xna.Framework.Graphics.Effect.ctor.call(this, cloneSource);
            }
        }
    });

    Bridge.define("MyONez.Base.AdditionalStuff.Effects.HeatDistortionEffect", {
        inherits: [Microsoft.Xna.Framework.Graphics.Effect],
        statics: {
            fields: {
                EffectAssetName: null
            },
            ctors: {
                init: function () {
                    this.EffectAssetName = "effects/HeatDistortion";
                }
            }
        },
        props: {
            DistortionFactor: {
                get: function () {
                    return this.Parameters.getItem$1("_distortionFactor").GetValueSingle();
                },
                set: function (value) {
                    this.Parameters.getItem$1("_distortionFactor").SetValue$12(value);
                }
            },
            RiseFactor: {
                get: function () {
                    return this.Parameters.getItem$1("_riseFactor").GetValueSingle();
                },
                set: function (value) {
                    this.Parameters.getItem$1("_riseFactor").SetValue$12(value);
                }
            },
            Time: {
                get: function () {
                    return this.Parameters.getItem$1("_time").GetValueSingle();
                },
                set: function (value) {
                    this.Parameters.getItem$1("_time").SetValue$12(value);
                }
            },
            DistortionTexture: {
                get: function () {
                    return this.Parameters.getItem$1("_distortionTexture").GetValueTexture2D();
                },
                set: function (value) {
                    this.Parameters.getItem$1("_distortionTexture").SetValue(value);
                }
            }
        },
        ctors: {
            ctor: function (effect) {
                this.$initialize();
                Microsoft.Xna.Framework.Graphics.Effect.ctor.call(this, effect);
            }
        }
    });

    Bridge.define("MyONez.Base.AdditionalStuff.Effects.InvertEffect", {
        inherits: [Microsoft.Xna.Framework.Graphics.Effect],
        statics: {
            fields: {
                EffectAssetName: null
            },
            ctors: {
                init: function () {
                    this.EffectAssetName = "effects/Invert";
                }
            }
        },
        ctors: {
            ctor: function (effect) {
                this.$initialize();
                Microsoft.Xna.Framework.Graphics.Effect.ctor.call(this, effect);
            }
        }
    });

    Bridge.define("MyONez.Base.AdditionalStuff.Effects.LetterboxEffect", {
        inherits: [Microsoft.Xna.Framework.Graphics.Effect],
        statics: {
            fields: {
                EffectAssetName: null
            },
            ctors: {
                init: function () {
                    this.EffectAssetName = "effects/Letterbox";
                }
            }
        },
        props: {
            Color: {
                get: function () {
                    return new Microsoft.Xna.Framework.Color.$ctor4(this.Parameters.getItem$1("_color").GetValueVector4());
                },
                set: function (value) {
                    this.Parameters.getItem$1("_color").SetValue$8(value.ToVector4());
                }
            },
            LetterboxSize: {
                get: function () {
                    return this.Parameters.getItem$1("_letterboxSize").GetValueSingle();
                },
                set: function (value) {
                    this.Parameters.getItem$1("_letterboxSize").SetValue$12(value);
                }
            }
        },
        ctors: {
            ctor: function (effect) {
                this.$initialize();
                Microsoft.Xna.Framework.Graphics.Effect.ctor.call(this, effect);
            }
        }
    });

    Bridge.define("MyONez.Base.AdditionalStuff.Effects.MultiTextureEffect", {
        inherits: [Microsoft.Xna.Framework.Graphics.Effect],
        statics: {
            fields: {
                EffectAssetName: null
            },
            ctors: {
                init: function () {
                    this.EffectAssetName = "effects/MultiTexture";
                }
            }
        },
        ctors: {
            ctor: function (effect) {
                this.$initialize();
                Microsoft.Xna.Framework.Graphics.Effect.ctor.call(this, effect);
            }
        }
    });

    Bridge.define("MyONez.Base.AdditionalStuff.Effects.MultiTextureOverlayEffect", {
        inherits: [Microsoft.Xna.Framework.Graphics.Effect],
        statics: {
            fields: {
                EffectAssetName: null
            },
            ctors: {
                init: function () {
                    this.EffectAssetName = "effects/MultiTextureOverlay";
                }
            }
        },
        props: {
            SecondTexture: {
                get: function () {
                    return this.Parameters.getItem$1("_secondTexture").GetValueTexture2D();
                },
                set: function (value) {
                    this.Parameters.getItem$1("_secondTexture").SetValue(value);
                }
            }
        },
        ctors: {
            ctor: function (effect) {
                this.$initialize();
                Microsoft.Xna.Framework.Graphics.Effect.ctor.call(this, effect);
            }
        }
    });

    Bridge.define("MyONez.Base.AdditionalStuff.Effects.NoiseEffect", {
        inherits: [Microsoft.Xna.Framework.Graphics.Effect],
        statics: {
            fields: {
                EffectAssetName: null
            },
            ctors: {
                init: function () {
                    this.EffectAssetName = "effects/Noise";
                }
            }
        },
        fields: {
            noiseParam: null
        },
        props: {
            Noise: {
                get: function () {
                    return this.noiseParam.GetValueSingle();
                },
                set: function (value) {
                    this.noiseParam.SetValue$12(value);
                }
            }
        },
        ctors: {
            ctor: function (effect) {
                this.$initialize();
                Microsoft.Xna.Framework.Graphics.Effect.ctor.call(this, effect);
                this.noiseParam = this.Parameters.getItem$1("noise");
                this.Noise = 1;
            }
        }
    });

    Bridge.define("MyONez.Base.AdditionalStuff.Effects.PaletteCyclerEffect", {
        inherits: [Microsoft.Xna.Framework.Graphics.Effect],
        statics: {
            fields: {
                EffectAssetName: null
            },
            ctors: {
                init: function () {
                    this.EffectAssetName = "effects/PaletteCycler";
                }
            }
        },
        fields: {
            cycleSpeedParam: null,
            paletteTextureParam: null,
            timeParam: null
        },
        props: {
            PaletteTexture: {
                get: function () {
                    return this.paletteTextureParam.GetValueTexture2D();
                },
                set: function (value) {
                    this.paletteTextureParam.SetValue(value);
                }
            },
            CycleSpeed: {
                get: function () {
                    return this.cycleSpeedParam.GetValueSingle();
                },
                set: function (value) {
                    this.cycleSpeedParam.SetValue$12(value);
                }
            },
            Time: {
                get: function () {
                    return this.timeParam.GetValueSingle();
                },
                set: function (value) {
                    this.timeParam.SetValue$12(value);
                }
            }
        },
        ctors: {
            ctor: function (effect) {
                this.$initialize();
                Microsoft.Xna.Framework.Graphics.Effect.ctor.call(this, effect);
                this.paletteTextureParam = this.Parameters.getItem$1("_paletteTexture");
                this.cycleSpeedParam = this.Parameters.getItem$1("_cycleSpeed");
                this.timeParam = this.Parameters.getItem$1("_time");
            }
        }
    });

    Bridge.define("MyONez.Base.AdditionalStuff.Effects.PixelGlitchEffect", {
        inherits: [Microsoft.Xna.Framework.Graphics.Effect],
        statics: {
            fields: {
                EffectAssetName: null
            },
            ctors: {
                init: function () {
                    this.EffectAssetName = "effects/PixelGlitch";
                }
            }
        },
        props: {
            VerticalSize: {
                get: function () {
                    return this.Parameters.getItem$1("_verticalSize").GetValueSingle();
                },
                set: function (value) {
                    this.Parameters.getItem$1("_verticalSize").SetValue$12(value);
                }
            },
            HorizontalOffset: {
                get: function () {
                    return this.Parameters.getItem$1("_horizontalOffset").GetValueSingle();
                },
                set: function (value) {
                    this.Parameters.getItem$1("_horizontalOffset").SetValue$12(value);
                }
            },
            ScreenSize: {
                get: function () {
                    return this.Parameters.getItem$1("_screenSize").GetValueVector2();
                },
                set: function (value) {
                    this.Parameters.getItem$1("_screenSize").SetValue$4(value.$clone());
                }
            }
        },
        ctors: {
            ctor: function (effect) {
                this.$initialize();
                Microsoft.Xna.Framework.Graphics.Effect.ctor.call(this, effect);
            }
        }
    });

    Bridge.define("MyONez.Base.AdditionalStuff.Effects.PolygonLightEffect", {
        inherits: [Microsoft.Xna.Framework.Graphics.Effect],
        statics: {
            fields: {
                EffectAssetName: null
            },
            ctors: {
                init: function () {
                    this.EffectAssetName = "effects/PolygonLight";
                }
            }
        },
        ctors: {
            ctor: function (effect) {
                this.$initialize();
                Microsoft.Xna.Framework.Graphics.Effect.ctor.call(this, effect);
            }
        }
    });

    Bridge.define("MyONez.Base.AdditionalStuff.Effects.ReflectionEffect", {
        inherits: [Microsoft.Xna.Framework.Graphics.Effect],
        statics: {
            fields: {
                EffectAssetName: null
            },
            ctors: {
                init: function () {
                    this.EffectAssetName = "effects/Reflection";
                }
            }
        },
        fields: {
            matrixTransformParam: null,
            normalMagnitudeParam: null,
            normalMapParam: null,
            reflectionIntensityParam: null,
            renderTextureParam: null
        },
        props: {
            ReflectionIntensity: {
                get: function () {
                    return this.reflectionIntensityParam.GetValueSingle();
                },
                set: function (value) {
                    this.reflectionIntensityParam.SetValue$12(value);
                }
            },
            NormalMagnitude: {
                get: function () {
                    return this.normalMagnitudeParam.GetValueSingle();
                },
                set: function (value) {
                    this.normalMagnitudeParam.SetValue$12(value);
                }
            },
            NormalMap: {
                get: function () {
                    return this.normalMapParam.GetValueTexture2D();
                },
                set: function (value) {
                    this.normalMapParam.SetValue(value);
                }
            },
            RenderTexture: {
                get: function () {
                    return this.renderTextureParam.GetValueTexture2D();
                },
                set: function (value) {
                    this.renderTextureParam.SetValue(value);
                }
            },
            MatrixTransform: {
                get: function () {
                    return this.matrixTransformParam.GetValueMatrix();
                },
                set: function (value) {
                    this.matrixTransformParam.SetValue$1(value.$clone());
                }
            }
        },
        ctors: {
            ctor: function (effect) {
                this.$initialize();
                Microsoft.Xna.Framework.Graphics.Effect.ctor.call(this, effect);
                this.reflectionIntensityParam = this.Parameters.getItem$1("_reflectionIntensity");
                this.renderTextureParam = this.Parameters.getItem$1("_renderTexture");
                this.normalMapParam = this.Parameters.getItem$1("_normalMap");
                this.matrixTransformParam = this.Parameters.getItem$1("_matrixTransform");
                this.normalMagnitudeParam = this.Parameters.getItem$1("_normalMagnitude");

                this.ReflectionIntensity = 0.4;
                this.NormalMagnitude = 0.05;
            }
        }
    });

    Bridge.define("MyONez.Base.AdditionalStuff.Effects.ScanlinesEffect", {
        inherits: [Microsoft.Xna.Framework.Graphics.Effect],
        statics: {
            fields: {
                EffectAssetName: null
            },
            ctors: {
                init: function () {
                    this.EffectAssetName = "effects/Scanlines";
                }
            }
        },
        fields: {
            attenuationParam: null,
            linesFactorParam: null
        },
        props: {
            Attenuation: {
                get: function () {
                    return this.attenuationParam.GetValueSingle();
                },
                set: function (value) {
                    this.attenuationParam.SetValue$12(value);
                }
            },
            LinesFactor: {
                get: function () {
                    return this.linesFactorParam.GetValueSingle();
                },
                set: function (value) {
                    this.linesFactorParam.SetValue$12(value);
                }
            }
        },
        ctors: {
            ctor: function (effect) {
                this.$initialize();
                Microsoft.Xna.Framework.Graphics.Effect.ctor.call(this, effect);
                this.attenuationParam = this.Parameters.getItem$1("_attenuation");
                this.linesFactorParam = this.Parameters.getItem$1("_linesFactor");

                this.Attenuation = 0.04;
                this.LinesFactor = 800.0;
            }
        }
    });

    Bridge.define("MyONez.Base.AdditionalStuff.Effects.SepiaEffect", {
        inherits: [Microsoft.Xna.Framework.Graphics.Effect],
        statics: {
            fields: {
                EffectAssetName: null
            },
            ctors: {
                init: function () {
                    this.EffectAssetName = "effects/Sepia";
                }
            }
        },
        fields: {
            sepiaToneParam: null
        },
        props: {
            SepiaTone: {
                get: function () {
                    return this.sepiaToneParam.GetValueVector3();
                },
                set: function (value) {
                    this.sepiaToneParam.SetValue$6(value.$clone());
                }
            }
        },
        ctors: {
            ctor: function (effect) {
                this.$initialize();
                Microsoft.Xna.Framework.Graphics.Effect.ctor.call(this, effect);
                this.sepiaToneParam = this.Parameters.getItem$1("_sepiaTone");
                this.SepiaTone = new Microsoft.Xna.Framework.Vector3.$ctor3(1.2, 1.0, 0.8);
            }
        }
    });

    Bridge.define("MyONez.Base.AdditionalStuff.Effects.SpriteAlphaTestEffect", {
        inherits: [Microsoft.Xna.Framework.Graphics.Effect],
        statics: {
            fields: {
                EffectAssetName: null
            },
            ctors: {
                init: function () {
                    this.EffectAssetName = "effects/SpriteAlphaTest";
                }
            }
        },
        fields: {
            alphaTestParam: null,
            compareFunction: 0,
            referenceAlpha: 0
        },
        props: {
            ReferenceAlpha: {
                get: function () {
                    return this.referenceAlpha;
                },
                set: function (value) {
                    if (this.referenceAlpha === value) {
                        return;
                    }

                    this.referenceAlpha = value;
                    this.UpdateEffectParameter();
                }
            },
            CompareFunction: {
                get: function () {
                    return this.compareFunction;
                },
                set: function (value) {
                    if (this.compareFunction === value) {
                        return;
                    }

                    this.compareFunction = value;
                    this.UpdateEffectParameter();
                }
            }
        },
        ctors: {
            init: function () {
                this.compareFunction = MyONez.Base.AdditionalStuff.Effects.SpriteAlphaTestEffect.AlphaTestCompareFunction.Greater;
                this.referenceAlpha = 0.5;
            },
            ctor: function (effect) {
                this.$initialize();
                Microsoft.Xna.Framework.Graphics.Effect.ctor.call(this, effect);
                this.alphaTestParam = this.Parameters.getItem$1("_alphaTest");
                this.UpdateEffectParameter();
            }
        },
        methods: {
            UpdateEffectParameter: function () {
                var value = new Microsoft.Xna.Framework.Vector3.ctor();

                value.X = this.referenceAlpha;

                switch (this.compareFunction) {
                    case MyONez.Base.AdditionalStuff.Effects.SpriteAlphaTestEffect.AlphaTestCompareFunction.Greater: 
                        value.Y = -1;
                        value.Z = 1;
                        break;
                    case MyONez.Base.AdditionalStuff.Effects.SpriteAlphaTestEffect.AlphaTestCompareFunction.LessThan: 
                        value.Y = 1;
                        value.Z = -1;
                        break;
                    case MyONez.Base.AdditionalStuff.Effects.SpriteAlphaTestEffect.AlphaTestCompareFunction.Always: 
                        value.Y = 1;
                        value.Z = 1;
                        break;
                    case MyONez.Base.AdditionalStuff.Effects.SpriteAlphaTestEffect.AlphaTestCompareFunction.Never: 
                        value.Y = -1;
                        value.Z = -1;
                        break;
                }

                this.alphaTestParam.SetValue$6(value.$clone());
            }
        }
    });

    Bridge.define("MyONez.Base.AdditionalStuff.Effects.SpriteAlphaTestEffect.AlphaTestCompareFunction", {
        $kind: "nested enum",
        statics: {
            fields: {
                Greater: 0,
                LessThan: 1,
                Always: 2,
                Never: 3
            }
        }
    });

    Bridge.define("MyONez.Base.AdditionalStuff.Effects.SpriteBlinkEffect", {
        inherits: [Microsoft.Xna.Framework.Graphics.Effect],
        statics: {
            fields: {
                EffectAssetName: null
            },
            ctors: {
                init: function () {
                    this.EffectAssetName = "effects/SpriteBlinkEffect";
                }
            }
        },
        fields: {
            blinkColorParam: null
        },
        props: {
            BlinkColor: {
                get: function () {
                    return new Microsoft.Xna.Framework.Color.$ctor4(this.blinkColorParam.GetValueVector4());
                },
                set: function (value) {
                    this.blinkColorParam.SetValue$8(value.ToVector4());
                }
            }
        },
        ctors: {
            ctor: function (effect) {
                this.$initialize();
                Microsoft.Xna.Framework.Graphics.Effect.ctor.call(this, effect);
                this.blinkColorParam = this.Parameters.getItem$1("_blinkColor");

                this.BlinkColor = Microsoft.Xna.Framework.Color.TransparentBlack.$clone();
            }
        }
    });

    Bridge.define("MyONez.Base.AdditionalStuff.Effects.SpriteLightMultiplyEffect", {
        inherits: [Microsoft.Xna.Framework.Graphics.Effect],
        statics: {
            fields: {
                EffectAssetName: null
            },
            ctors: {
                init: function () {
                    this.EffectAssetName = "effects/SpriteLightMultiply";
                }
            }
        },
        props: {
            LightTexture: {
                get: function () {
                    return this.Parameters.getItem$1("_lightTexture").GetValueTexture2D();
                },
                set: function (value) {
                    this.Parameters.getItem$1("_lightTexture").SetValue(value);
                }
            },
            MultiplicativeFactor: {
                get: function () {
                    return this.Parameters.getItem$1("_multiplicativeFactor").GetValueSingle();
                },
                set: function (value) {
                    this.Parameters.getItem$1("_multiplicativeFactor").SetValue$12(value);
                }
            }
        },
        ctors: {
            ctor: function (effect) {
                this.$initialize();
                Microsoft.Xna.Framework.Graphics.Effect.ctor.call(this, effect);
            }
        }
    });

    Bridge.define("MyONez.Base.AdditionalStuff.Effects.SpriteLinesEffect", {
        inherits: [Microsoft.Xna.Framework.Graphics.Effect],
        statics: {
            fields: {
                EffectAssetName: null
            },
            ctors: {
                init: function () {
                    this.EffectAssetName = "effects/SpriteLines";
                }
            }
        },
        fields: {
            lineColorParam: null,
            lineSizeParam: null
        },
        props: {
            LineColor: {
                get: function () {
                    return new Microsoft.Xna.Framework.Color.$ctor4(this.lineColorParam.GetValueVector4());
                },
                set: function (value) {
                    this.lineColorParam.SetValue$8(value.ToVector4());
                }
            },
            LineSize: {
                get: function () {
                    return this.lineSizeParam.GetValueSingle();
                },
                set: function (value) {
                    this.lineSizeParam.SetValue$12(value);
                }
            },
            IsVertical: {
                get: function () {
                    return Bridge.referenceEquals(this.CurrentTechnique, this.Techniques.getItem$1("VerticalLines"));
                },
                set: function (value) {
                    this.CurrentTechnique = this.Techniques.getItem$1(value ? "VerticalLines:" : "HorizontalLines");
                }
            }
        },
        ctors: {
            ctor: function (effect) {
                this.$initialize();
                Microsoft.Xna.Framework.Graphics.Effect.ctor.call(this, effect);
                this.lineColorParam = this.Parameters.getItem$1("_lineColor");
                this.lineSizeParam = this.Parameters.getItem$1("_lineSize");

                this.LineColor = Microsoft.Xna.Framework.Color.Red.$clone();
                this.LineSize = 5.0;
            }
        }
    });

    Bridge.define("MyONez.Base.AdditionalStuff.Effects.SquaresEffect", {
        inherits: [Microsoft.Xna.Framework.Graphics.Effect,SpineEngine.Graphics.Transitions.IProgressEffect],
        statics: {
            fields: {
                EffectAssetName: null
            },
            ctors: {
                init: function () {
                    this.EffectAssetName = "effects/Squares";
                }
            }
        },
        props: {
            Color: {
                get: function () {
                    return new Microsoft.Xna.Framework.Color.$ctor4(this.Parameters.getItem$1("_color").GetValueVector4());
                },
                set: function (value) {
                    this.Parameters.getItem$1("_color").SetValue$8(value.ToVector4());
                }
            },
            Smoothness: {
                get: function () {
                    return this.Parameters.getItem$1("_smoothness").GetValueSingle();
                },
                set: function (value) {
                    this.Parameters.getItem$1("_smoothness").SetValue$12(value);
                }
            },
            Size: {
                get: function () {
                    return this.Parameters.getItem$1("_size").GetValueVector2();
                },
                set: function (value) {
                    this.Parameters.getItem$1("_size").SetValue$4(value.$clone());
                }
            },
            Progress: {
                get: function () {
                    return this.Parameters.getItem$1("_progress").GetValueSingle();
                },
                set: function (value) {
                    this.Parameters.getItem$1("_progress").SetValue$12(value);
                }
            }
        },
        alias: ["Progress", "SpineEngine$Graphics$Transitions$IProgressEffect$Progress"],
        ctors: {
            ctor: function (effect) {
                this.$initialize();
                Microsoft.Xna.Framework.Graphics.Effect.ctor.call(this, effect);
                this.Color = Microsoft.Xna.Framework.Color.Black.$clone();
                this.Smoothness = 0.5;
                this.Size = new Microsoft.Xna.Framework.Vector2.$ctor2(30, 30);
                this.Progress = 0;
            }
        }
    });

    Bridge.define("MyONez.Base.AdditionalStuff.Effects.TextureWipeEffect", {
        inherits: [Microsoft.Xna.Framework.Graphics.Effect,SpineEngine.Graphics.Transitions.IProgressEffect],
        statics: {
            fields: {
                EffectAssetName: null
            },
            ctors: {
                init: function () {
                    this.EffectAssetName = "effects/TextureWipe";
                }
            }
        },
        props: {
            Opacity: {
                get: function () {
                    return this.Parameters.getItem$1("_opacity").GetValueSingle();
                },
                set: function (value) {
                    this.Parameters.getItem$1("_opacity").SetValue$12(value);
                }
            },
            Color: {
                get: function () {
                    return new Microsoft.Xna.Framework.Color.$ctor4(this.Parameters.getItem$1("_color").GetValueVector4());
                },
                set: function (value) {
                    this.Parameters.getItem$1("_color").SetValue$8(value.ToVector4());
                }
            },
            Texture: {
                get: function () {
                    return this.Parameters.getItem$1("_transitionTex").GetValueTexture2D();
                },
                set: function (value) {
                    this.Parameters.getItem$1("_transitionTex").SetValue(value);
                }
            },
            Progress: {
                get: function () {
                    return this.Parameters.getItem$1("_progress").GetValueSingle();
                },
                set: function (value) {
                    this.Parameters.getItem$1("_progress").SetValue$12(value);
                }
            }
        },
        alias: ["Progress", "SpineEngine$Graphics$Transitions$IProgressEffect$Progress"],
        ctors: {
            ctor: function (effect) {
                this.$initialize();
                Microsoft.Xna.Framework.Graphics.Effect.ctor.call(this, effect);
            }
        }
    });

    Bridge.define("MyONez.Base.AdditionalStuff.Effects.TwistEffect", {
        inherits: [Microsoft.Xna.Framework.Graphics.Effect],
        statics: {
            fields: {
                EffectAssetName: null
            },
            ctors: {
                init: function () {
                    this.EffectAssetName = "effects/Twist";
                }
            }
        },
        fields: {
            angleParam: null,
            offsetParam: null,
            radiusParam: null
        },
        props: {
            Radius: {
                get: function () {
                    return this.radiusParam.GetValueSingle();
                },
                set: function (value) {
                    this.radiusParam.SetValue$12(value);
                }
            },
            Angle: {
                get: function () {
                    return this.angleParam.GetValueSingle();
                },
                set: function (value) {
                    this.angleParam.SetValue$12(value);
                }
            },
            Offset: {
                get: function () {
                    return this.offsetParam.GetValueVector2();
                },
                set: function (value) {
                    this.offsetParam.SetValue$4(value.$clone());
                }
            }
        },
        ctors: {
            ctor: function (effect) {
                this.$initialize();
                Microsoft.Xna.Framework.Graphics.Effect.ctor.call(this, effect);
                this.radiusParam = this.Parameters.getItem$1("radius");
                this.angleParam = this.Parameters.getItem$1("angle");
                this.offsetParam = this.Parameters.getItem$1("offset");

                this.Radius = 0.5;
                this.Angle = 5.0;
                this.Offset = Microsoft.Xna.Framework.Vector2.op_Division$1(Microsoft.Xna.Framework.Vector2.One.$clone(), 2);
            }
        }
    });

    Bridge.define("MyONez.Base.AdditionalStuff.Effects.VignetteEffect", {
        inherits: [Microsoft.Xna.Framework.Graphics.Effect],
        statics: {
            fields: {
                EffectAssetName: null
            },
            ctors: {
                init: function () {
                    this.EffectAssetName = "effects/Vignette";
                }
            }
        },
        props: {
            Power: {
                get: function () {
                    return this.Parameters.getItem$1("_power").GetValueSingle();
                },
                set: function (value) {
                    this.Parameters.getItem$1("_power").SetValue$12(value);
                }
            },
            Radius: {
                get: function () {
                    return this.Parameters.getItem$1("_radius").GetValueSingle();
                },
                set: function (value) {
                    this.Parameters.getItem$1("_radius").SetValue$12(value);
                }
            }
        },
        ctors: {
            ctor: function (effect) {
                this.$initialize();
                Microsoft.Xna.Framework.Graphics.Effect.ctor.call(this, effect);
            }
        }
    });

    Bridge.define("MyONez.Base.AdditionalStuff.Effects.WindEffect", {
        inherits: [Microsoft.Xna.Framework.Graphics.Effect,SpineEngine.Graphics.Transitions.IProgressEffect],
        statics: {
            fields: {
                EffectAssetName: null
            },
            ctors: {
                init: function () {
                    this.EffectAssetName = "effects/Wind";
                }
            }
        },
        props: {
            Segments: {
                get: function () {
                    return this.Parameters.getItem$1("_windSegments").GetValueSingle();
                },
                set: function (value) {
                    this.Parameters.getItem$1("_windSegments").SetValue$12(value);
                }
            },
            Size: {
                get: function () {
                    return this.Parameters.getItem$1("_size").GetValueSingle();
                },
                set: function (value) {
                    this.Parameters.getItem$1("_size").SetValue$12(value);
                }
            },
            Progress: {
                get: function () {
                    return this.Parameters.getItem$1("_progress").GetValueSingle();
                },
                set: function (value) {
                    this.Parameters.getItem$1("_progress").SetValue$12(value);
                }
            }
        },
        alias: ["Progress", "SpineEngine$Graphics$Transitions$IProgressEffect$Progress"],
        ctors: {
            ctor: function (effect) {
                this.$initialize();
                Microsoft.Xna.Framework.Graphics.Effect.ctor.call(this, effect);
            }
        }
    });

    Bridge.define("MyONez.Base.AdditionalStuff.FaceUI.ECS.Components.TextComponent", {
        inherits: [LocomotorECS.Component],
        props: {
            Text: null,
            Label: null
        }
    });

    Bridge.define("MyONez.Base.AdditionalStuff.FaceUI.ECS.Components.UIComponent", {
        inherits: [LocomotorECS.Component],
        fields: {
            GameTime: null,
            MouseProvider: null
        },
        props: {
            UserInterface: null
        },
        ctors: {
            init: function () {
                this.GameTime = new Microsoft.Xna.Framework.GameTime.ctor();
                this.MouseProvider = new MyONez.Base.AdditionalStuff.FaceUI.Utils.ResolutionMouseProvider();
                this.UserInterface = new FaceUI.UserInterface();
            }
        }
    });

    Bridge.define("MyONez.Base.AdditionalStuff.FaceUI.ECS.EntitySystems.TextUIUpdateSystem", {
        inherits: [LocomotorECS.EntityProcessingSystem],
        ctors: {
            ctor: function () {
                this.$initialize();
                LocomotorECS.EntityProcessingSystem.ctor.call(this, new LocomotorECS.Matching.Matcher().All([MyONez.Base.AdditionalStuff.FaceUI.ECS.Components.TextComponent]));
            }
        },
        methods: {
            DoAction$1: function (entity, gameTime) {
                var $t, $t1, $t2, $t3;
                LocomotorECS.EntityProcessingSystem.prototype.DoAction$1.call(this, entity, gameTime);
                var ui = entity.GetOrCreateComponent(MyONez.Base.AdditionalStuff.FaceUI.ECS.Components.UIComponent);
                var text = entity.GetComponent(MyONez.Base.AdditionalStuff.FaceUI.ECS.Components.TextComponent);
                var scale = ($t = (($t1 = entity.GetComponent(SpineEngine.ECS.Components.ScaleComponent)) != null ? $t1.Scale : null), $t != null ? $t : Microsoft.Xna.Framework.Vector2.One);
                var color = ($t2 = (($t3 = entity.GetComponent(SpineEngine.ECS.Components.ColorComponent)) != null ? $t3.Color : null), $t2 != null ? $t2 : Microsoft.Xna.Framework.Color.White);

                ui.UserInterface.ShowCursor = false;

                if (text.Label == null) {
                    text.Label = new FaceUI.Entities.Label.$ctor1(text.Text);
                    ui.UserInterface.AddEntity(text.Label);
                }

                text.Label.FillColor = color.$clone();
                text.Label.Text = text.Text;
                text.Label.Scale = scale.X;
            }
        }
    });

    Bridge.define("MyONez.Base.AdditionalStuff.FaceUI.ECS.EntitySystems.UIUpdateSystem", {
        inherits: [LocomotorECS.EntityProcessingSystem,SpineEngine.ECS.IScreenResolutionChangedListener],
        fields: {
            spriteBatchWrapper: null,
            totalTime: null
        },
        alias: ["SceneBackBufferSizeChanged", "SpineEngine$ECS$IScreenResolutionChangedListener$SceneBackBufferSizeChanged"],
        ctors: {
            init: function () {
                this.totalTime = new System.TimeSpan();
                this.spriteBatchWrapper = new MyONez.Base.AdditionalStuff.FaceUI.Utils.MeshBatchWrapper();
                this.totalTime = System.TimeSpan.zero;
            },
            ctor: function (content) {
                this.$initialize();
                LocomotorECS.EntityProcessingSystem.ctor.call(this, new LocomotorECS.Matching.Matcher().All([MyONez.Base.AdditionalStuff.FaceUI.ECS.Components.UIComponent]));
                FaceUI.UserInterface.Initialize(content, FaceUI.BuiltinThemes.hd);
            }
        },
        methods: {
            DoAction$1: function (entity, gameTime) {
                var $t, $t1;
                LocomotorECS.EntityProcessingSystem.prototype.DoAction$1.call(this, entity, gameTime);
                var ui = entity.GetComponent(MyONez.Base.AdditionalStuff.FaceUI.ECS.Components.UIComponent);
                var scale = ($t = (($t1 = entity.GetComponent(SpineEngine.ECS.Components.ScaleComponent)) != null ? $t1.Scale : null), $t != null ? $t : Microsoft.Xna.Framework.Vector2.One);
                var mouse = entity.GetOrCreateComponent(SpineEngine.ECS.Components.InputMouseComponent);
                var touch = entity.GetOrCreateComponent(SpineEngine.ECS.Components.InputTouchComponent);
                var finalRender = entity.GetOrCreateComponent(SpineEngine.ECS.Components.FinalRenderComponent);

                this.totalTime = System.TimeSpan.add(this.totalTime, gameTime);

                FaceUI.UserInterface.Active = ui.UserInterface;
                ui.UserInterface.MouseInputProvider = ui.MouseProvider;

                ui.MouseProvider._oldMouseState = ui.MouseProvider._newMouseState.$clone();
                if (touch.IsConnected) {
                    if (System.Linq.Enumerable.from(touch.CurrentTouches).any()) {
                        var touchPosition = touch.GetScaledPosition(touch.CurrentTouches.getItem(0).$clone().Position.$clone());
                        ui.MouseProvider._newMouseState.X = touchPosition.X;
                        ui.MouseProvider._newMouseState.Y = touchPosition.Y;
                        ui.MouseProvider._newMouseState.LeftButton = Microsoft.Xna.Framework.Input.ButtonState.Pressed;
                    } else {
                        ui.MouseProvider._newMouseState.X = ui.MouseProvider._oldMouseState.X;
                        ui.MouseProvider._newMouseState.Y = ui.MouseProvider._oldMouseState.Y;
                        ui.MouseProvider._newMouseState.LeftButton = Microsoft.Xna.Framework.Input.ButtonState.Released;
                    }

                    ui.MouseProvider._newMouseState.RightButton = Microsoft.Xna.Framework.Input.ButtonState.Released;
                    ui.MouseProvider._newMouseState.MiddleButton = Microsoft.Xna.Framework.Input.ButtonState.Released;
                    ui.MouseProvider._newMouseState.ScrollWheelValue = 0;
                } else {
                    ui.MouseProvider._newMouseState.X = mouse.ScaledMousePosition.X;
                    ui.MouseProvider._newMouseState.Y = mouse.ScaledMousePosition.Y;
                    ui.MouseProvider._newMouseState.LeftButton = mouse.CurrentMouseState.LeftButton;
                    ui.MouseProvider._newMouseState.RightButton = mouse.CurrentMouseState.RightButton;
                    ui.MouseProvider._newMouseState.MiddleButton = mouse.CurrentMouseState.MiddleButton;
                    ui.MouseProvider._newMouseState.ScrollWheelValue = mouse.CurrentMouseState.ScrollWheelValue;
                }

                ui.UserInterface.GlobalScale = scale.X;
                ui.GameTime.TotalGameTime = this.totalTime;
                ui.GameTime.ElapsedGameTime = gameTime;
                ui.UserInterface.Update(ui.GameTime);
                this.spriteBatchWrapper.MeshBatch = finalRender.Batch;
                this.spriteBatchWrapper.MeshBatch.Clear();
                ui.UserInterface.Draw(this.spriteBatchWrapper);
            },
            SceneBackBufferSizeChanged: function (realRenderTarget, sceneRenderTarget) {
                Bridge.cast(this.spriteBatchWrapper.GraphicsDevice, MyONez.Base.AdditionalStuff.FaceUI.Utils.ScreenGraphicDeviceWrapper).ViewRectangle = sceneRenderTarget.$clone();
            }
        }
    });

    Bridge.define("MyONez.Base.AdditionalStuff.FaceUI.Utils.GeonBitUIResources", {
        statics: {
            methods: {
                GetEnumerator: function (content, theme) {
                    var $step = 0,
                        $jumpFromFinally,
                        $returnValue,
                        root,
                        $t,
                        cursor,
                        cursorName,
                        $t1,
                        skin,
                        skinName,
                        $t2,
                        skin1,
                        skinName1,
                        $t3,
                        style,
                        $t4,
                        skin2,
                        skinName2,
                        $async_e;

                    var $enumerator = new Bridge.GeneratorEnumerator(Bridge.fn.bind(this, function () {
                        try {
                            for (;;) {
                                switch ($step) {
                                    case 0: {
                                        root = "FaceUI/themes/" + (theme || "") + "/";

                                            content.Load(Microsoft.Xna.Framework.Graphics.Texture2D, (root || "") + "textures/horizontal_line");
                                            $enumerator.current = Bridge.box(0, System.Int32);
                                            $step = 1;
                                            return true;
                                    }
                                    case 1: {
                                        content.Load(Microsoft.Xna.Framework.Graphics.Texture2D, (root || "") + "textures/white_texture");
                                            $enumerator.current = Bridge.box(0, System.Int32);
                                            $step = 2;
                                            return true;
                                    }
                                    case 2: {
                                        content.Load(Microsoft.Xna.Framework.Graphics.Texture2D, (root || "") + "textures/icons/background");
                                            $enumerator.current = Bridge.box(0, System.Int32);
                                            $step = 3;
                                            return true;
                                    }
                                    case 3: {
                                        content.Load(Microsoft.Xna.Framework.Graphics.Texture2D, (root || "") + "textures/scrollbar");
                                            $enumerator.current = Bridge.box(0, System.Int32);
                                            $step = 4;
                                            return true;
                                    }
                                    case 4: {
                                        content.Load(Microsoft.Xna.Framework.Graphics.Texture2D, (root || "") + "textures/scrollbar_mark");
                                            $enumerator.current = Bridge.box(0, System.Int32);
                                            $step = 5;
                                            return true;
                                    }
                                    case 5: {
                                        content.Load(Microsoft.Xna.Framework.Graphics.Texture2D, (root || "") + "textures/arrow_down");
                                            $enumerator.current = Bridge.box(0, System.Int32);
                                            $step = 6;
                                            return true;
                                    }
                                    case 6: {
                                        content.Load(Microsoft.Xna.Framework.Graphics.Texture2D, (root || "") + "textures/arrow_up");
                                            $enumerator.current = Bridge.box(0, System.Int32);
                                            $step = 7;
                                            return true;
                                    }
                                    case 7: {
                                        content.Load(Microsoft.Xna.Framework.Graphics.Texture2D, (root || "") + "textures/progressbar");
                                            $enumerator.current = Bridge.box(0, System.Int32);
                                            $step = 8;
                                            return true;
                                    }
                                    case 8: {
                                        content.Load(Microsoft.Xna.Framework.Graphics.Texture2D, (root || "") + "textures/progressbar_fill");
                                            $enumerator.current = Bridge.box(0, System.Int32);
                                            $step = 9;
                                            return true;
                                    }
                                    case 9: {
                                        $t = Bridge.getEnumerator(System.Enum.getValues(FaceUI.CursorType));
                                            try {
                                                while ($t.moveNext()) {
                                                    cursor = Bridge.cast($t.Current, FaceUI.CursorType);
                                                    cursorName = System.Enum.getName(FaceUI.CursorType, Bridge.box(cursor, FaceUI.CursorType, System.Enum.toStringFn(FaceUI.CursorType))).toLowerCase();
                                                    content.Load(FaceUI.DataTypes.CursorTextureData, (root || "") + "textures/cursor_" + (cursorName || "") + "_md");
                                                }
                                            } finally {
                                                if (Bridge.is($t, System.IDisposable)) {
                                                    $t.System$IDisposable$Dispose();
                                                }
                                            }

                                            $enumerator.current = Bridge.box(0, System.Int32);
                                            $step = 10;
                                            return true;
                                    }
                                    case 10: {
                                        $t1 = Bridge.getEnumerator(System.Enum.getValues(FaceUI.Entities.PanelSkin));
                                            try {
                                                while ($t1.moveNext()) {
                                                    skin = Bridge.cast($t1.Current, FaceUI.Entities.PanelSkin);
                                                    if (skin === FaceUI.Entities.PanelSkin.None) {
                                                        continue;
                                                    }
                                                    skinName = System.Enum.toString(FaceUI.Entities.PanelSkin, skin).toLowerCase();
                                                    content.Load(FaceUI.DataTypes.TextureData, (root || "") + "textures/panel_" + (skinName || "") + "_md");
                                                }
                                            } finally {
                                                if (Bridge.is($t1, System.IDisposable)) {
                                                    $t1.System$IDisposable$Dispose();
                                                }
                                            }
                                            $enumerator.current = Bridge.box(0, System.Int32);
                                            $step = 11;
                                            return true;
                                    }
                                    case 11: {
                                        content.Load(FaceUI.DataTypes.TextureData, (root || "") + "textures/scrollbar_md");
                                            $enumerator.current = Bridge.box(0, System.Int32);
                                            $step = 12;
                                            return true;
                                    }
                                    case 12: {
                                        $t2 = Bridge.getEnumerator(System.Enum.getValues(FaceUI.Entities.SliderSkin));
                                            try {
                                                while ($t2.moveNext()) {
                                                    skin1 = Bridge.cast($t2.Current, FaceUI.Entities.SliderSkin);
                                                    skinName1 = System.Enum.toString(FaceUI.Entities.SliderSkin, skin1).toLowerCase();
                                                    content.Load(FaceUI.DataTypes.TextureData, (root || "") + "textures/slider_" + (skinName1 || "") + "_md");
                                                }
                                            } finally {
                                                if (Bridge.is($t2, System.IDisposable)) {
                                                    $t2.System$IDisposable$Dispose();
                                                }
                                            }
                                            $enumerator.current = Bridge.box(0, System.Int32);
                                            $step = 13;
                                            return true;
                                    }
                                    case 13: {
                                        $t3 = Bridge.getEnumerator(System.Enum.getValues(FaceUI.Entities.FontStyle));
                                            try {
                                                while ($t3.moveNext()) {
                                                    style = Bridge.cast($t3.Current, FaceUI.Entities.FontStyle);
                                                    content.Load(Microsoft.Xna.Framework.Graphics.SpriteFont, (root || "") + "fonts/" + (System.Enum.toString(FaceUI.Entities.FontStyle, style) || ""));
                                                }
                                            } finally {
                                                if (Bridge.is($t3, System.IDisposable)) {
                                                    $t3.System$IDisposable$Dispose();
                                                }
                                            }
                                            $enumerator.current = Bridge.box(0, System.Int32);
                                            $step = 14;
                                            return true;
                                    }
                                    case 14: {
                                        $t4 = Bridge.getEnumerator(System.Enum.getValues(FaceUI.Entities.ButtonSkin));
                                            try {
                                                while ($t4.moveNext()) {
                                                    skin2 = Bridge.cast($t4.Current, FaceUI.Entities.ButtonSkin);
                                                    skinName2 = System.Enum.toString(FaceUI.Entities.ButtonSkin, skin2).toLowerCase();
                                                    content.Load(FaceUI.DataTypes.TextureData, (root || "") + "textures/button_" + (skinName2 || "") + "_md");
                                                }
                                            } finally {
                                                if (Bridge.is($t4, System.IDisposable)) {
                                                    $t4.System$IDisposable$Dispose();
                                                }
                                            }
                                            $enumerator.current = Bridge.box(0, System.Int32);
                                            $step = 15;
                                            return true;
                                    }
                                    case 15: {
                                        content.Load(FaceUI.DataTypes.TextureData, (root || "") + "textures/progressbar_md");
                                            $enumerator.current = Bridge.box(0, System.Int32);
                                            $step = 16;
                                            return true;
                                    }
                                    case 16: {
                                        content.Load(Microsoft.Xna.Framework.Graphics.Effect, (root || "") + "effects/disabled");
                                            $enumerator.current = Bridge.box(0, System.Int32);
                                            $step = 17;
                                            return true;
                                    }
                                    case 17: {
                                        content.Load(Microsoft.Xna.Framework.Graphics.Effect, (root || "") + "effects/silhouette");
                                            $enumerator.current = Bridge.box(0, System.Int32);
                                            $step = 18;
                                            return true;
                                    }
                                    case 18: {
                                        MyONez.Base.AdditionalStuff.FaceUI.Utils.GeonBitUIResources.LoadDefaultStyles(Bridge.ref(FaceUI.Entities.Entity, "DefaultStyle"), "Entity", root, content);
                                            $enumerator.current = Bridge.box(0, System.Int32);
                                            $step = 19;
                                            return true;
                                    }
                                    case 19: {
                                        MyONez.Base.AdditionalStuff.FaceUI.Utils.GeonBitUIResources.LoadDefaultStyles(Bridge.ref(FaceUI.Entities.Paragraph, "DefaultStyle"), "Paragraph", root, content);
                                            $enumerator.current = Bridge.box(0, System.Int32);
                                            $step = 20;
                                            return true;
                                    }
                                    case 20: {
                                        MyONez.Base.AdditionalStuff.FaceUI.Utils.GeonBitUIResources.LoadDefaultStyles(Bridge.ref(FaceUI.Entities.Button, "DefaultStyle"), "Button", root, content);
                                            $enumerator.current = Bridge.box(0, System.Int32);
                                            $step = 21;
                                            return true;
                                    }
                                    case 21: {
                                        MyONez.Base.AdditionalStuff.FaceUI.Utils.GeonBitUIResources.LoadDefaultStyles(Bridge.ref(FaceUI.Entities.Button, "DefaultParagraphStyle"), "ButtonParagraph", root, content);
                                            $enumerator.current = Bridge.box(0, System.Int32);
                                            $step = 22;
                                            return true;
                                    }
                                    case 22: {
                                        MyONez.Base.AdditionalStuff.FaceUI.Utils.GeonBitUIResources.LoadDefaultStyles(Bridge.ref(FaceUI.Entities.CheckBox, "DefaultStyle"), "CheckBox", root, content);
                                            $enumerator.current = Bridge.box(0, System.Int32);
                                            $step = 23;
                                            return true;
                                    }
                                    case 23: {
                                        MyONez.Base.AdditionalStuff.FaceUI.Utils.GeonBitUIResources.LoadDefaultStyles(Bridge.ref(FaceUI.Entities.CheckBox, "DefaultParagraphStyle"), "CheckBoxParagraph", root, content);
                                            $enumerator.current = Bridge.box(0, System.Int32);
                                            $step = 24;
                                            return true;
                                    }
                                    case 24: {
                                        MyONez.Base.AdditionalStuff.FaceUI.Utils.GeonBitUIResources.LoadDefaultStyles(Bridge.ref(FaceUI.Entities.ColoredRectangle, "DefaultStyle"), "ColoredRectangle", root, content);
                                            $enumerator.current = Bridge.box(0, System.Int32);
                                            $step = 25;
                                            return true;
                                    }
                                    case 25: {
                                        MyONez.Base.AdditionalStuff.FaceUI.Utils.GeonBitUIResources.LoadDefaultStyles(Bridge.ref(FaceUI.Entities.DropDown, "DefaultStyle"), "DropDown", root, content);
                                            $enumerator.current = Bridge.box(0, System.Int32);
                                            $step = 26;
                                            return true;
                                    }
                                    case 26: {
                                        MyONez.Base.AdditionalStuff.FaceUI.Utils.GeonBitUIResources.LoadDefaultStyles(Bridge.ref(FaceUI.Entities.DropDown, "DefaultParagraphStyle"), "DropDownParagraph", root, content);
                                            $enumerator.current = Bridge.box(0, System.Int32);
                                            $step = 27;
                                            return true;
                                    }
                                    case 27: {
                                        MyONez.Base.AdditionalStuff.FaceUI.Utils.GeonBitUIResources.LoadDefaultStyles(Bridge.ref(FaceUI.Entities.DropDown, "DefaultSelectedParagraphStyle"), "DropDownSelectedParagraph", root, content);
                                            $enumerator.current = Bridge.box(0, System.Int32);
                                            $step = 28;
                                            return true;
                                    }
                                    case 28: {
                                        MyONez.Base.AdditionalStuff.FaceUI.Utils.GeonBitUIResources.LoadDefaultStyles(Bridge.ref(FaceUI.Entities.Header, "DefaultStyle"), "Header", root, content);
                                            $enumerator.current = Bridge.box(0, System.Int32);
                                            $step = 29;
                                            return true;
                                    }
                                    case 29: {
                                        MyONez.Base.AdditionalStuff.FaceUI.Utils.GeonBitUIResources.LoadDefaultStyles(Bridge.ref(FaceUI.Entities.HorizontalLine, "DefaultStyle"), "HorizontalLine", root, content);
                                            $enumerator.current = Bridge.box(0, System.Int32);
                                            $step = 30;
                                            return true;
                                    }
                                    case 30: {
                                        MyONez.Base.AdditionalStuff.FaceUI.Utils.GeonBitUIResources.LoadDefaultStyles(Bridge.ref(FaceUI.Entities.Icon, "DefaultStyle"), "Icon", root, content);
                                            $enumerator.current = Bridge.box(0, System.Int32);
                                            $step = 31;
                                            return true;
                                    }
                                    case 31: {
                                        MyONez.Base.AdditionalStuff.FaceUI.Utils.GeonBitUIResources.LoadDefaultStyles(Bridge.ref(FaceUI.Entities.Image, "DefaultStyle"), "Image", root, content);
                                            $enumerator.current = Bridge.box(0, System.Int32);
                                            $step = 32;
                                            return true;
                                    }
                                    case 32: {
                                        MyONez.Base.AdditionalStuff.FaceUI.Utils.GeonBitUIResources.LoadDefaultStyles(Bridge.ref(FaceUI.Entities.Label, "DefaultStyle"), "Label", root, content);
                                            $enumerator.current = Bridge.box(0, System.Int32);
                                            $step = 33;
                                            return true;
                                    }
                                    case 33: {
                                        MyONez.Base.AdditionalStuff.FaceUI.Utils.GeonBitUIResources.LoadDefaultStyles(Bridge.ref(FaceUI.Entities.Panel, "DefaultStyle"), "Panel", root, content);
                                            $enumerator.current = Bridge.box(0, System.Int32);
                                            $step = 34;
                                            return true;
                                    }
                                    case 34: {
                                        MyONez.Base.AdditionalStuff.FaceUI.Utils.GeonBitUIResources.LoadDefaultStyles(Bridge.ref(FaceUI.Entities.ProgressBar, "DefaultStyle"), "ProgressBar", root, content);
                                            $enumerator.current = Bridge.box(0, System.Int32);
                                            $step = 35;
                                            return true;
                                    }
                                    case 35: {
                                        MyONez.Base.AdditionalStuff.FaceUI.Utils.GeonBitUIResources.LoadDefaultStyles(Bridge.ref(FaceUI.Entities.ProgressBar, "DefaultFillStyle"), "ProgressBarFill", root, content);
                                            $enumerator.current = Bridge.box(0, System.Int32);
                                            $step = 36;
                                            return true;
                                    }
                                    case 36: {
                                        MyONez.Base.AdditionalStuff.FaceUI.Utils.GeonBitUIResources.LoadDefaultStyles(Bridge.ref(FaceUI.Entities.RadioButton, "DefaultStyle"), "RadioButton", root, content);
                                            $enumerator.current = Bridge.box(0, System.Int32);
                                            $step = 37;
                                            return true;
                                    }
                                    case 37: {
                                        MyONez.Base.AdditionalStuff.FaceUI.Utils.GeonBitUIResources.LoadDefaultStyles(Bridge.ref(FaceUI.Entities.RadioButton, "DefaultParagraphStyle"), "RadioButtonParagraph", root, content);
                                            $enumerator.current = Bridge.box(0, System.Int32);
                                            $step = 38;
                                            return true;
                                    }
                                    case 38: {
                                        MyONez.Base.AdditionalStuff.FaceUI.Utils.GeonBitUIResources.LoadDefaultStyles(Bridge.ref(FaceUI.Entities.SelectList, "DefaultStyle"), "SelectList", root, content);
                                            $enumerator.current = Bridge.box(0, System.Int32);
                                            $step = 39;
                                            return true;
                                    }
                                    case 39: {
                                        MyONez.Base.AdditionalStuff.FaceUI.Utils.GeonBitUIResources.LoadDefaultStyles(Bridge.ref(FaceUI.Entities.SelectList, "DefaultParagraphStyle"), "SelectListParagraph", root, content);
                                            $enumerator.current = Bridge.box(0, System.Int32);
                                            $step = 40;
                                            return true;
                                    }
                                    case 40: {
                                        MyONez.Base.AdditionalStuff.FaceUI.Utils.GeonBitUIResources.LoadDefaultStyles(Bridge.ref(FaceUI.Entities.Slider, "DefaultStyle"), "Slider", root, content);
                                            $enumerator.current = Bridge.box(0, System.Int32);
                                            $step = 41;
                                            return true;
                                    }
                                    case 41: {
                                        MyONez.Base.AdditionalStuff.FaceUI.Utils.GeonBitUIResources.LoadDefaultStyles(Bridge.ref(FaceUI.Entities.TextInput, "DefaultStyle"), "TextInput", root, content);
                                            $enumerator.current = Bridge.box(0, System.Int32);
                                            $step = 42;
                                            return true;
                                    }
                                    case 42: {
                                        MyONez.Base.AdditionalStuff.FaceUI.Utils.GeonBitUIResources.LoadDefaultStyles(Bridge.ref(FaceUI.Entities.TextInput, "DefaultParagraphStyle"), "TextInputParagraph", root, content);
                                            $enumerator.current = Bridge.box(0, System.Int32);
                                            $step = 43;
                                            return true;
                                    }
                                    case 43: {
                                        MyONez.Base.AdditionalStuff.FaceUI.Utils.GeonBitUIResources.LoadDefaultStyles(Bridge.ref(FaceUI.Entities.TextInput, "DefaultPlaceholderStyle"), "TextInputPlaceholder", root, content);
                                            $enumerator.current = Bridge.box(0, System.Int32);
                                            $step = 44;
                                            return true;
                                    }
                                    case 44: {
                                        MyONez.Base.AdditionalStuff.FaceUI.Utils.GeonBitUIResources.LoadDefaultStyles(Bridge.ref(FaceUI.Entities.VerticalScrollbar, "DefaultStyle"), "VerticalScrollbar", root, content);
                                            $enumerator.current = Bridge.box(0, System.Int32);
                                            $step = 45;
                                            return true;
                                    }
                                    case 45: {
                                        MyONez.Base.AdditionalStuff.FaceUI.Utils.GeonBitUIResources.LoadDefaultStyles(Bridge.ref(FaceUI.Entities.PanelTabs, "DefaultButtonStyle"), "PanelTabsButton", root, content);
                                            $enumerator.current = Bridge.box(0, System.Int32);
                                            $step = 46;
                                            return true;
                                    }
                                    case 46: {
                                        MyONez.Base.AdditionalStuff.FaceUI.Utils.GeonBitUIResources.LoadDefaultStyles(Bridge.ref(FaceUI.Entities.PanelTabs, "DefaultButtonParagraphStyle"), "PanelTabsButtonParagraph", root, content);
                                            $enumerator.current = Bridge.box(0, System.Int32);
                                            $step = 47;
                                            return true;
                                    }
                                    case 47: {

                                    }
                                    default: {
                                        return false;
                                    }
                                }
                            }
                        } catch($async_e1) {
                            $async_e = System.Exception.create($async_e1);
                            throw $async_e;
                        }
                    }));
                    return $enumerator;
                },
                LoadDefaultStyles: function (sheet, entityName, themeRoot, content) {
                    var stylesheetBase = (themeRoot || "") + "styles/" + (entityName || "");
                    content.Load(FaceUI.DataTypes.DefaultStylesList, stylesheetBase);
                }
            }
        }
    });

    Bridge.define("MyONez.Base.AdditionalStuff.FaceUI.Utils.MeshBatchWrapper", {
        inherits: [FaceUI.Utils.ISpriteBatchWrapper],
        fields: {
            glyphsCache: null
        },
        props: {
            MeshBatch: null,
            GraphicsDevice: null
        },
        alias: [
            "Begin", "FaceUI$Utils$ISpriteBatchWrapper$Begin",
            "End", "FaceUI$Utils$ISpriteBatchWrapper$End",
            "Draw", "FaceUI$Utils$ISpriteBatchWrapper$Draw",
            "Draw$1", "FaceUI$Utils$ISpriteBatchWrapper$Draw$1",
            "DrawString", "FaceUI$Utils$ISpriteBatchWrapper$DrawString",
            "GraphicsDevice", "FaceUI$Utils$ISpriteBatchWrapper$GraphicsDevice"
        ],
        ctors: {
            init: function () {
                this.glyphsCache = new (System.Collections.Generic.Dictionary$2(Microsoft.Xna.Framework.Graphics.SpriteFont,System.Collections.Generic.Dictionary$2(System.Char,Microsoft.Xna.Framework.Graphics.SpriteFont.Glyph)))();
                this.GraphicsDevice = new MyONez.Base.AdditionalStuff.FaceUI.Utils.ScreenGraphicDeviceWrapper();
            }
        },
        methods: {
            Begin: function (sortMode, blendState, samplerState, depthStencilState, rasterizerState, effect, transformMatrix) {
                if (sortMode === void 0) { sortMode = 0; }
                if (blendState === void 0) { blendState = null; }
                if (samplerState === void 0) { samplerState = null; }
                if (depthStencilState === void 0) { depthStencilState = null; }
                if (rasterizerState === void 0) { rasterizerState = null; }
                if (effect === void 0) { effect = null; }
                if (transformMatrix === void 0) { transformMatrix = null; }
            },
            End: function () { },
            Draw: function (texture, destRect, color) {
                this.MeshBatch.Draw(texture, SpineEngine.Maths.RectangleF.op_Implicit$1(destRect.$clone()), SpineEngine.Maths.RectangleF.op_Implicit$1(texture.Bounds.$clone()), color.$clone());
            },
            Draw$1: function (texture, destRect, srcRect, color) {
                this.MeshBatch.Draw(texture, SpineEngine.Maths.RectangleF.op_Implicit$1(destRect.$clone()), SpineEngine.Maths.RectangleF.op_Implicit$1(srcRect.$clone()), color.$clone());
            },
            DrawString: function (spriteFont, text, position, color, rotation, origin, scalef, effects, layerDepth) {
                var scale = new Microsoft.Xna.Framework.Vector2.$ctor1(scalef);

                var flipAdjustment = Microsoft.Xna.Framework.Vector2.Zero.$clone();

                var flippedVert = (effects & Microsoft.Xna.Framework.Graphics.SpriteEffects.FlipVertically) === Microsoft.Xna.Framework.Graphics.SpriteEffects.FlipVertically;
                var flippedHorz = (effects & Microsoft.Xna.Framework.Graphics.SpriteEffects.FlipHorizontally) === Microsoft.Xna.Framework.Graphics.SpriteEffects.FlipHorizontally;

                if (flippedVert || flippedHorz) {
                    var size = spriteFont.MeasureString(text);

                    if (flippedHorz) {
                        origin.X *= -1;
                        flipAdjustment.X = -size.X;
                    }

                    if (flippedVert) {
                        origin.Y *= -1;
                        flipAdjustment.Y = spriteFont.LineSpacing - size.Y;
                    }
                }

                var transformation = { v : Microsoft.Xna.Framework.Matrix.Identity.$clone() };
                var cos = 0, sin = 0;
                if (rotation === 0) {
                    transformation.v.M11 = (flippedHorz ? -scale.X : scale.X);
                    transformation.v.M22 = (flippedVert ? -scale.Y : scale.Y);
                    transformation.v.M41 = ((flipAdjustment.X - origin.X) * transformation.v.M11) + position.X;
                    transformation.v.M42 = ((flipAdjustment.Y - origin.Y) * transformation.v.M22) + position.Y;
                } else {
                    cos = Math.cos(rotation);
                    sin = Math.sin(rotation);
                    transformation.v.M11 = (flippedHorz ? -scale.X : scale.X) * cos;
                    transformation.v.M12 = (flippedHorz ? -scale.X : scale.X) * sin;
                    transformation.v.M21 = (flippedVert ? -scale.Y : scale.Y) * (-sin);
                    transformation.v.M22 = (flippedVert ? -scale.Y : scale.Y) * cos;
                    transformation.v.M41 = (((flipAdjustment.X - origin.X) * transformation.v.M11) + (flipAdjustment.Y - origin.Y) * transformation.v.M21) + position.X;
                    transformation.v.M42 = (((flipAdjustment.X - origin.X) * transformation.v.M12) + (flipAdjustment.Y - origin.Y) * transformation.v.M22) + position.Y;
                }

                var offset = Microsoft.Xna.Framework.Vector2.Zero.$clone();
                var firstGlyphOfLine = true;

                if (!this.glyphsCache.containsKey(spriteFont)) {
                    this.glyphsCache.set(spriteFont, spriteFont.GetGlyphs());
                }

                var pGlyphs = this.glyphsCache.get(spriteFont);

                for (var i = 0; i < text.length; i = (i + 1) | 0) {
                    var c = text.charCodeAt(i);

                    if (c === 13) {
                        continue;
                    }

                    if (c === 10) {
                        offset.X = 0;
                        offset.Y += spriteFont.LineSpacing;
                        firstGlyphOfLine = true;
                        continue;
                    }

                    var pCurrentGlyph = pGlyphs.get(c).$clone();

                    // The first character on a line might have a negative left side bearing.
                    // In this scenario, SpriteBatch/SpriteFont normally offset the text to the right,
                    //  so that text does not hang off the left side of its rectangle.
                    if (firstGlyphOfLine) {
                        offset.X = Math.max(pCurrentGlyph.LeftSideBearing, 0);
                        firstGlyphOfLine = false;
                    } else {
                        offset.X += spriteFont.Spacing + pCurrentGlyph.LeftSideBearing;
                    }

                    var p = { v : offset.$clone() };

                    if (flippedHorz) {
                        p.v.X += pCurrentGlyph.BoundsInTexture.Width;
                    }
                    p.v.X += pCurrentGlyph.Cropping.X;

                    if (flippedVert) {
                        p.v.Y += (pCurrentGlyph.BoundsInTexture.Height - spriteFont.LineSpacing) | 0;
                    }
                    p.v.Y += pCurrentGlyph.Cropping.Y;

                    Microsoft.Xna.Framework.Vector2.Transform$2(p, transformation, p);

                    //if ((effects & SpriteEffects.FlipVertically) != 0)
                    //{
                    //    var temp = _texCoordBR.Y;
                    //    _texCoordBR.Y = _texCoordTL.Y;
                    //    _texCoordTL.Y = temp;
                    //}
                    //if ((effects & SpriteEffects.FlipHorizontally) != 0)
                    //{
                    //    var temp = _texCoordBR.X;
                    //    _texCoordBR.X = _texCoordTL.X;
                    //    _texCoordTL.X = temp;
                    //}

                    this.Draw$1(spriteFont.Texture, SpineEngine.Maths.RectangleF.op_Implicit(new SpineEngine.Maths.RectangleF.$ctor2(p.v.X, p.v.Y, pCurrentGlyph.BoundsInTexture.Width * scale.X, pCurrentGlyph.BoundsInTexture.Height * scale.Y)), SpineEngine.Maths.RectangleF.op_Implicit(new SpineEngine.Maths.RectangleF.$ctor2(pCurrentGlyph.BoundsInTexture.X, pCurrentGlyph.BoundsInTexture.Y, (((((pCurrentGlyph.BoundsInTexture.X + pCurrentGlyph.BoundsInTexture.Width) | 0)) - pCurrentGlyph.BoundsInTexture.X) | 0), (((((pCurrentGlyph.BoundsInTexture.Y + pCurrentGlyph.BoundsInTexture.Height) | 0)) - pCurrentGlyph.BoundsInTexture.Y) | 0))), color.$clone());

                    offset.X += pCurrentGlyph.Width + pCurrentGlyph.RightSideBearing;
                }
            }
        }
    });

    Bridge.define("MyONez.Base.AdditionalStuff.FaceUI.Utils.ResolutionMouseProvider", {
        inherits: [FaceUI.IMouseInput],
        fields: {
            _newMouseState: null,
            _oldMouseState: null,
            _newMousePos: null,
            _oldMousePos: null
        },
        props: {
            MouseWheel: 0,
            MouseWheelChange: 0,
            MousePosition: {
                get: function () {
                    return this._newMousePos.$clone();
                }
            },
            MousePositionDiff: {
                get: function () {
                    return Microsoft.Xna.Framework.Vector2.op_Subtraction(this._newMousePos.$clone(), this._oldMousePos.$clone());
                }
            }
        },
        alias: [
            "MouseWheel", "FaceUI$IMouseInput$MouseWheel",
            "MouseWheelChange", "FaceUI$IMouseInput$MouseWheelChange",
            "Update", "FaceUI$IMouseInput$Update",
            "UpdateMousePosition", "FaceUI$IMouseInput$UpdateMousePosition",
            "TransformMousePosition", "FaceUI$IMouseInput$TransformMousePosition",
            "MousePosition", "FaceUI$IMouseInput$MousePosition",
            "MousePositionDiff", "FaceUI$IMouseInput$MousePositionDiff",
            "MouseButtonDown", "FaceUI$IMouseInput$MouseButtonDown",
            "AnyMouseButtonDown", "FaceUI$IMouseInput$AnyMouseButtonDown",
            "MouseButtonReleased", "FaceUI$IMouseInput$MouseButtonReleased",
            "AnyMouseButtonReleased", "FaceUI$IMouseInput$AnyMouseButtonReleased",
            "MouseButtonPressed", "FaceUI$IMouseInput$MouseButtonPressed",
            "AnyMouseButtonPressed", "FaceUI$IMouseInput$AnyMouseButtonPressed",
            "MouseButtonClick", "FaceUI$IMouseInput$MouseButtonClick",
            "AnyMouseButtonClicked", "FaceUI$IMouseInput$AnyMouseButtonClicked"
        ],
        ctors: {
            init: function () {
                this._newMouseState = new MyONez.Base.AdditionalStuff.FaceUI.Utils.ResolutionMouseProvider.State();
                this._oldMouseState = new MyONez.Base.AdditionalStuff.FaceUI.Utils.ResolutionMouseProvider.State();
                this._newMousePos = new Microsoft.Xna.Framework.Vector2();
                this._oldMousePos = new Microsoft.Xna.Framework.Vector2();
            }
        },
        methods: {
            Update: function (gameTime) {
                // get mouse position
                this._oldMousePos = this._newMousePos.$clone();
                this._newMousePos = new Microsoft.Xna.Framework.Vector2.$ctor2(this._newMouseState.X, this._newMouseState.Y);

                // get mouse wheel state
                var prevMouseWheel = this.MouseWheel;
                this.MouseWheel = this._newMouseState.ScrollWheelValue;
                this.MouseWheelChange = Bridge.Int.sign(this.MouseWheel - prevMouseWheel);
            },
            UpdateMousePosition: function (pos) {
                // move mouse position back to center
                Microsoft.Xna.Framework.Input.Mouse.SetPosition(Bridge.Int.clip32(pos.X), Bridge.Int.clip32(pos.Y));
                this._newMousePos = (this._oldMousePos = pos.$clone());
            },
            TransformMousePosition: function (transform) {
                var newMousePos = this._newMousePos.$clone();
                if (System.Nullable.liftne(Microsoft.Xna.Framework.Matrix.op_Inequality, System.Nullable.lift1("$clone", transform), null)) {
                    return Microsoft.Xna.Framework.Vector2.op_Subtraction(Microsoft.Xna.Framework.Vector2.Transform(newMousePos.$clone(), System.Nullable.getValue(transform).$clone()), new Microsoft.Xna.Framework.Vector2.$ctor2(System.Nullable.getValue(transform).Translation.X, System.Nullable.getValue(transform).Translation.Y));
                }
                return newMousePos.$clone();
            },
            MouseButtonDown: function (button) {
                if (button === void 0) { button = 0; }
                return this.GetMouseButtonState(button) === Microsoft.Xna.Framework.Input.ButtonState.Pressed;
            },
            AnyMouseButtonDown: function () {
                return this.MouseButtonDown(FaceUI.MouseButton.Left) || this.MouseButtonDown(FaceUI.MouseButton.Right) || this.MouseButtonDown(FaceUI.MouseButton.Middle);
            },
            MouseButtonReleased: function (button) {
                if (button === void 0) { button = 0; }
                return this.GetMouseButtonState(button) === Microsoft.Xna.Framework.Input.ButtonState.Released && this.GetMousePreviousButtonState(button) === Microsoft.Xna.Framework.Input.ButtonState.Pressed;
            },
            AnyMouseButtonReleased: function () {
                return this.MouseButtonReleased(FaceUI.MouseButton.Left) || this.MouseButtonReleased(FaceUI.MouseButton.Right) || this.MouseButtonReleased(FaceUI.MouseButton.Middle);
            },
            MouseButtonPressed: function (button) {
                if (button === void 0) { button = 0; }
                return this.GetMouseButtonState(button) === Microsoft.Xna.Framework.Input.ButtonState.Pressed && this.GetMousePreviousButtonState(button) === Microsoft.Xna.Framework.Input.ButtonState.Released;
            },
            AnyMouseButtonPressed: function () {
                return this.MouseButtonPressed(FaceUI.MouseButton.Left) || this.MouseButtonPressed(FaceUI.MouseButton.Right) || this.MouseButtonPressed(FaceUI.MouseButton.Middle);
            },
            MouseButtonClick: function (button) {
                if (button === void 0) { button = 0; }
                return this.GetMouseButtonState(button) === Microsoft.Xna.Framework.Input.ButtonState.Released && this.GetMousePreviousButtonState(button) === Microsoft.Xna.Framework.Input.ButtonState.Pressed;
            },
            AnyMouseButtonClicked: function () {
                return this.MouseButtonClick(FaceUI.MouseButton.Left) || this.MouseButtonClick(FaceUI.MouseButton.Right) || this.MouseButtonClick(FaceUI.MouseButton.Middle);
            },
            GetMouseButtonState: function (button) {
                if (button === void 0) { button = 0; }
                switch (button) {
                    case FaceUI.MouseButton.Left: 
                        return this._newMouseState.LeftButton;
                    case FaceUI.MouseButton.Right: 
                        return this._newMouseState.RightButton;
                    case FaceUI.MouseButton.Middle: 
                        return this._newMouseState.MiddleButton;
                }
                return Microsoft.Xna.Framework.Input.ButtonState.Released;
            },
            GetMousePreviousButtonState: function (button) {
                if (button === void 0) { button = 0; }
                switch (button) {
                    case FaceUI.MouseButton.Left: 
                        return this._oldMouseState.LeftButton;
                    case FaceUI.MouseButton.Right: 
                        return this._oldMouseState.RightButton;
                    case FaceUI.MouseButton.Middle: 
                        return this._oldMouseState.MiddleButton;
                }
                return Microsoft.Xna.Framework.Input.ButtonState.Released;
            }
        }
    });

    Bridge.define("MyONez.Base.AdditionalStuff.FaceUI.Utils.ResolutionMouseProvider.State", {
        $kind: "nested struct",
        statics: {
            methods: {
                getDefaultValue: function () { return new MyONez.Base.AdditionalStuff.FaceUI.Utils.ResolutionMouseProvider.State(); }
            }
        },
        props: {
            X: 0,
            Y: 0,
            LeftButton: 0,
            RightButton: 0,
            MiddleButton: 0,
            ScrollWheelValue: 0
        },
        ctors: {
            ctor: function () {
                this.$initialize();
            }
        },
        methods: {
            getHashCode: function () {
                var h = Bridge.addHash([1952543928, this.X, this.Y, this.LeftButton, this.RightButton, this.MiddleButton, this.ScrollWheelValue]);
                return h;
            },
            equals: function (o) {
                if (!Bridge.is(o, MyONez.Base.AdditionalStuff.FaceUI.Utils.ResolutionMouseProvider.State)) {
                    return false;
                }
                return Bridge.equals(this.X, o.X) && Bridge.equals(this.Y, o.Y) && Bridge.equals(this.LeftButton, o.LeftButton) && Bridge.equals(this.RightButton, o.RightButton) && Bridge.equals(this.MiddleButton, o.MiddleButton) && Bridge.equals(this.ScrollWheelValue, o.ScrollWheelValue);
            },
            $clone: function (to) {
                var s = to || new MyONez.Base.AdditionalStuff.FaceUI.Utils.ResolutionMouseProvider.State();
                s.X = this.X;
                s.Y = this.Y;
                s.LeftButton = this.LeftButton;
                s.RightButton = this.RightButton;
                s.MiddleButton = this.MiddleButton;
                s.ScrollWheelValue = this.ScrollWheelValue;
                return s;
            }
        }
    });

    Bridge.define("MyONez.Base.AdditionalStuff.FaceUI.Utils.ScreenGraphicDeviceWrapper", {
        inherits: [FaceUI.Utils.GraphicDeviceWrapper],
        props: {
            ViewRectangle: null,
            Viewport: {
                get: function () {
                    return this.ViewRectangle.$clone();
                }
            },
            GraphicsDevice: null,
            PresentationParameters: null
        },
        ctors: {
            init: function () {
                this.ViewRectangle = new Microsoft.Xna.Framework.Rectangle();
            }
        },
        methods: {
            Clear: function (color) {

            },
            SetRenderTarget: function (target) {

            }
        }
    });

    Bridge.define("MyONez.Base.AdditionalStuff.Materials.MaterialDefaults", {
        statics: {
            methods: {
                StencilWrite: function (stencilRef) {
                    var $t, $t1;
                    if (stencilRef === void 0) { stencilRef = 1; }
                    return ($t = new SpineEngine.Graphics.Materials.Material(), $t.DepthStencilState = ($t1 = new Microsoft.Xna.Framework.Graphics.DepthStencilState.ctor(), $t1.StencilEnable = true, $t1.StencilFunction = Microsoft.Xna.Framework.Graphics.CompareFunction.Always, $t1.StencilPass = Microsoft.Xna.Framework.Graphics.StencilOperation.Replace, $t1.ReferenceStencil = stencilRef, $t1.DepthBufferEnable = false, $t1), $t);
                },
                StencilRead: function (stencilRef) {
                    var $t, $t1;
                    if (stencilRef === void 0) { stencilRef = 1; }
                    return ($t = new SpineEngine.Graphics.Materials.Material(), $t.DepthStencilState = ($t1 = new Microsoft.Xna.Framework.Graphics.DepthStencilState.ctor(), $t1.StencilEnable = true, $t1.StencilFunction = Microsoft.Xna.Framework.Graphics.CompareFunction.Equal, $t1.StencilPass = Microsoft.Xna.Framework.Graphics.StencilOperation.Keep, $t1.ReferenceStencil = stencilRef, $t1.DepthBufferEnable = false, $t1), $t);
                },
                BlendDarken: function () {
                    var $t, $t1;
                    return ($t = new SpineEngine.Graphics.Materials.Material(), $t.BlendState = ($t1 = new Microsoft.Xna.Framework.Graphics.BlendState.ctor(), $t1.ColorSourceBlend = Microsoft.Xna.Framework.Graphics.Blend.One, $t1.ColorDestinationBlend = Microsoft.Xna.Framework.Graphics.Blend.One, $t1.ColorBlendFunction = Microsoft.Xna.Framework.Graphics.BlendFunction.Min, $t1.AlphaSourceBlend = Microsoft.Xna.Framework.Graphics.Blend.One, $t1.AlphaDestinationBlend = Microsoft.Xna.Framework.Graphics.Blend.One, $t1.AlphaBlendFunction = Microsoft.Xna.Framework.Graphics.BlendFunction.Min, $t1), $t);
                },
                BlendLighten: function () {
                    var $t, $t1;
                    return ($t = new SpineEngine.Graphics.Materials.Material(), $t.BlendState = ($t1 = new Microsoft.Xna.Framework.Graphics.BlendState.ctor(), $t1.ColorSourceBlend = Microsoft.Xna.Framework.Graphics.Blend.One, $t1.ColorDestinationBlend = Microsoft.Xna.Framework.Graphics.Blend.One, $t1.ColorBlendFunction = Microsoft.Xna.Framework.Graphics.BlendFunction.Max, $t1.AlphaSourceBlend = Microsoft.Xna.Framework.Graphics.Blend.One, $t1.AlphaDestinationBlend = Microsoft.Xna.Framework.Graphics.Blend.One, $t1.AlphaBlendFunction = Microsoft.Xna.Framework.Graphics.BlendFunction.Max, $t1), $t);
                },
                BlendScreen: function () {
                    var $t, $t1;
                    return ($t = new SpineEngine.Graphics.Materials.Material(), $t.BlendState = ($t1 = new Microsoft.Xna.Framework.Graphics.BlendState.ctor(), $t1.ColorSourceBlend = Microsoft.Xna.Framework.Graphics.Blend.InverseDestinationColor, $t1.ColorDestinationBlend = Microsoft.Xna.Framework.Graphics.Blend.One, $t1.ColorBlendFunction = Microsoft.Xna.Framework.Graphics.BlendFunction.Add, $t1), $t);
                },
                BlendMultiply: function () {
                    var $t, $t1;
                    return ($t = new SpineEngine.Graphics.Materials.Material(), $t.BlendState = ($t1 = new Microsoft.Xna.Framework.Graphics.BlendState.ctor(), $t1.ColorSourceBlend = Microsoft.Xna.Framework.Graphics.Blend.DestinationColor, $t1.ColorDestinationBlend = Microsoft.Xna.Framework.Graphics.Blend.Zero, $t1.ColorBlendFunction = Microsoft.Xna.Framework.Graphics.BlendFunction.Add, $t1.AlphaSourceBlend = Microsoft.Xna.Framework.Graphics.Blend.DestinationAlpha, $t1.AlphaDestinationBlend = Microsoft.Xna.Framework.Graphics.Blend.Zero, $t1.AlphaBlendFunction = Microsoft.Xna.Framework.Graphics.BlendFunction.Add, $t1), $t);
                },
                BlendMultiply2X: function () {
                    var $t, $t1;
                    return ($t = new SpineEngine.Graphics.Materials.Material(), $t.BlendState = ($t1 = new Microsoft.Xna.Framework.Graphics.BlendState.ctor(), $t1.ColorSourceBlend = Microsoft.Xna.Framework.Graphics.Blend.DestinationColor, $t1.ColorDestinationBlend = Microsoft.Xna.Framework.Graphics.Blend.SourceColor, $t1.ColorBlendFunction = Microsoft.Xna.Framework.Graphics.BlendFunction.Add, $t1), $t);
                },
                BlendLinearDodge: function () {
                    var $t, $t1;
                    return ($t = new SpineEngine.Graphics.Materials.Material(), $t.BlendState = ($t1 = new Microsoft.Xna.Framework.Graphics.BlendState.ctor(), $t1.ColorSourceBlend = Microsoft.Xna.Framework.Graphics.Blend.One, $t1.ColorDestinationBlend = Microsoft.Xna.Framework.Graphics.Blend.One, $t1.ColorBlendFunction = Microsoft.Xna.Framework.Graphics.BlendFunction.Add, $t1), $t);
                },
                BlendLinearBurn: function () {
                    var $t, $t1;
                    return ($t = new SpineEngine.Graphics.Materials.Material(), $t.BlendState = ($t1 = new Microsoft.Xna.Framework.Graphics.BlendState.ctor(), $t1.ColorSourceBlend = Microsoft.Xna.Framework.Graphics.Blend.One, $t1.ColorDestinationBlend = Microsoft.Xna.Framework.Graphics.Blend.One, $t1.ColorBlendFunction = Microsoft.Xna.Framework.Graphics.BlendFunction.ReverseSubtract, $t1), $t);
                },
                BlendDifference: function () {
                    var $t, $t1;
                    return ($t = new SpineEngine.Graphics.Materials.Material(), $t.BlendState = ($t1 = new Microsoft.Xna.Framework.Graphics.BlendState.ctor(), $t1.ColorSourceBlend = Microsoft.Xna.Framework.Graphics.Blend.InverseDestinationColor, $t1.ColorDestinationBlend = Microsoft.Xna.Framework.Graphics.Blend.InverseSourceColor, $t1.ColorBlendFunction = Microsoft.Xna.Framework.Graphics.BlendFunction.Add, $t1), $t);
                },
                BlendSubtractive: function () {
                    var $t, $t1;
                    return ($t = new SpineEngine.Graphics.Materials.Material(), $t.BlendState = ($t1 = new Microsoft.Xna.Framework.Graphics.BlendState.ctor(), $t1.ColorSourceBlend = Microsoft.Xna.Framework.Graphics.Blend.SourceAlpha, $t1.ColorDestinationBlend = Microsoft.Xna.Framework.Graphics.Blend.One, $t1.ColorBlendFunction = Microsoft.Xna.Framework.Graphics.BlendFunction.ReverseSubtract, $t1.AlphaSourceBlend = Microsoft.Xna.Framework.Graphics.Blend.SourceAlpha, $t1.AlphaDestinationBlend = Microsoft.Xna.Framework.Graphics.Blend.One, $t1.AlphaBlendFunction = Microsoft.Xna.Framework.Graphics.BlendFunction.ReverseSubtract, $t1), $t);
                },
                BlendAdditive: function () {
                    var $t, $t1;
                    return ($t = new SpineEngine.Graphics.Materials.Material(), $t.BlendState = ($t1 = new Microsoft.Xna.Framework.Graphics.BlendState.ctor(), $t1.ColorSourceBlend = Microsoft.Xna.Framework.Graphics.Blend.SourceAlpha, $t1.ColorDestinationBlend = Microsoft.Xna.Framework.Graphics.Blend.One, $t1.AlphaSourceBlend = Microsoft.Xna.Framework.Graphics.Blend.SourceAlpha, $t1.AlphaDestinationBlend = Microsoft.Xna.Framework.Graphics.Blend.One, $t1), $t);
                }
            }
        }
    });

    Bridge.define("MyONez.Base.AdditionalStuff.RenderProcessors.BloomRenderProcessor", {
        inherits: [SpineEngine.Graphics.RenderProcessors.RenderProcessor,SpineEngine.ECS.IScreenResolutionChangedListener],
        fields: {
            bloomCombineEffect: null,
            bloomExtractEffect: null,
            gaussianBlurEffect: null,
            renderTarget1: null,
            renderTarget2: null,
            renderTargetScale: 0,
            scene: null,
            sceneRenderTarget: null,
            settings: null
        },
        props: {
            Settings: {
                get: function () {
                    return this.settings;
                },
                set: function (value) {
                    this.SetBloomSettings(value);
                }
            },
            RenderTargetScale: {
                get: function () {
                    return this.renderTargetScale;
                },
                set: function (value) {
                    if (this.renderTargetScale === value) {
                        return;
                    }

                    this.renderTargetScale = value;
                    this.UpdateBlurEffectDeltas();
                }
            }
        },
        alias: ["SceneBackBufferSizeChanged", "SpineEngine$ECS$IScreenResolutionChangedListener$SceneBackBufferSizeChanged"],
        ctors: {
            init: function () {
                this.sceneRenderTarget = new Microsoft.Xna.Framework.Rectangle();
                this.renderTargetScale = 1.0;
            },
            ctor: function (executionOrder) {
                this.$initialize();
                SpineEngine.Graphics.RenderProcessors.RenderProcessor.ctor.call(this, executionOrder);
                this.settings = MyONez.Base.AdditionalStuff.RenderProcessors.BloomRenderProcessor.BloomSettings.PresetSettings[System.Array.index(3, MyONez.Base.AdditionalStuff.RenderProcessors.BloomRenderProcessor.BloomSettings.PresetSettings)];
            }
        },
        methods: {
            SceneBackBufferSizeChanged: function (realRenderTarget, sceneRenderTarget) {
                this.sceneRenderTarget = sceneRenderTarget.$clone();
                this.UpdateBlurEffectDeltas();
            },
            OnAddedToScene: function (scene) {
                this.scene = scene;
                this.bloomExtractEffect = this.scene.Content.Load(MyONez.Base.AdditionalStuff.Effects.BloomExtractEffect, MyONez.Base.AdditionalStuff.Effects.BloomExtractEffect.EffectAssetName);
                this.bloomCombineEffect = this.scene.Content.Load(MyONez.Base.AdditionalStuff.Effects.BloomCombineEffect, MyONez.Base.AdditionalStuff.Effects.BloomCombineEffect.EffectAssetName);
                this.gaussianBlurEffect = this.scene.Content.Load(MyONez.Base.AdditionalStuff.Effects.GaussianBlurEffect, MyONez.Base.AdditionalStuff.Effects.GaussianBlurEffect.EffectAssetName);

                this.SetBloomSettings(this.settings);
            },
            SetBloomSettings: function (settings) {
                this.settings = settings;

                this.bloomExtractEffect.BloomThreshold = this.settings.Threshold;

                this.bloomCombineEffect.BloomIntensity = this.settings.Intensity;
                this.bloomCombineEffect.BaseIntensity = this.settings.BaseIntensity;
                this.bloomCombineEffect.BloomSaturation = this.settings.Saturation;
                this.bloomCombineEffect.BaseSaturation = this.settings.BaseSaturation;

                this.gaussianBlurEffect.BlurAmount = this.settings.BlurAmount;
            },
            UpdateBlurEffectDeltas: function () {
                if (this.sceneRenderTarget.Width === 0 || this.sceneRenderTarget.Height === 0) {
                    return;
                }

                this.gaussianBlurEffect.HorizontalBlurDelta = 1.0 / (this.sceneRenderTarget.Width * this.renderTargetScale);
                this.gaussianBlurEffect.VerticalBlurDelta = 1.0 / (this.sceneRenderTarget.Height * this.renderTargetScale);

                this.renderTarget1 != null ? this.renderTarget1.Dispose() : null;
                this.renderTarget1 = new Microsoft.Xna.Framework.Graphics.RenderTarget2D.$ctor2(SpineEngine.Core.Instance.GraphicsDevice, Bridge.Int.clip32(this.sceneRenderTarget.Width * this.renderTargetScale), Bridge.Int.clip32(this.sceneRenderTarget.Height * this.renderTargetScale), false, SpineEngine.Core.Instance.Screen.BackBufferFormat, Microsoft.Xna.Framework.Graphics.DepthFormat.None, 0, Microsoft.Xna.Framework.Graphics.RenderTargetUsage.PreserveContents);
                this.renderTarget2 != null ? this.renderTarget2.Dispose() : null;
                this.renderTarget2 = new Microsoft.Xna.Framework.Graphics.RenderTarget2D.$ctor2(SpineEngine.Core.Instance.GraphicsDevice, Bridge.Int.clip32(this.sceneRenderTarget.Width * this.renderTargetScale), Bridge.Int.clip32(this.sceneRenderTarget.Height * this.renderTargetScale), false, SpineEngine.Core.Instance.Screen.BackBufferFormat, Microsoft.Xna.Framework.Graphics.DepthFormat.None, 0, Microsoft.Xna.Framework.Graphics.RenderTargetUsage.PreserveContents);
            },
            Render: function (source, destination) {
                this.DrawFullScreenQuad(source, this.renderTarget1, this.bloomExtractEffect);

                this.gaussianBlurEffect.PrepareForHorizontalBlur();
                this.DrawFullScreenQuad(this.renderTarget1, this.renderTarget2, this.gaussianBlurEffect);

                this.gaussianBlurEffect.PrepareForVerticalBlur();
                this.DrawFullScreenQuad(this.renderTarget2, this.renderTarget1, this.gaussianBlurEffect);

                SpineEngine.Core.Instance.GraphicsDevice.SamplerStates.setItem(1, Microsoft.Xna.Framework.Graphics.SamplerState.LinearClamp);
                this.bloomCombineEffect.BaseMap = source;
                this.DrawFullScreenQuad(this.renderTarget1, destination, this.bloomCombineEffect);
            }
        }
    });

    Bridge.define("MyONez.Base.AdditionalStuff.RenderProcessors.BloomRenderProcessor.BloomSettings", {
        $kind: "nested class",
        statics: {
            fields: {
                PresetSettings: null
            },
            ctors: {
                init: function () {
                    this.PresetSettings = System.Array.init([
                        new MyONez.Base.AdditionalStuff.RenderProcessors.BloomRenderProcessor.BloomSettings(0.1, 0.6, 2.0, 1.0, 1, 0), 
                        new MyONez.Base.AdditionalStuff.RenderProcessors.BloomRenderProcessor.BloomSettings(0, 3, 1, 1, 1, 1), 
                        new MyONez.Base.AdditionalStuff.RenderProcessors.BloomRenderProcessor.BloomSettings(0.5, 8, 2, 1, 0, 1), 
                        new MyONez.Base.AdditionalStuff.RenderProcessors.BloomRenderProcessor.BloomSettings(0.25, 8, 1.3, 1, 1, 0), 
                        new MyONez.Base.AdditionalStuff.RenderProcessors.BloomRenderProcessor.BloomSettings(0, 2, 1, 0.1, 1, 1), 
                        new MyONez.Base.AdditionalStuff.RenderProcessors.BloomRenderProcessor.BloomSettings(0.5, 2, 1, 1, 1, 1)
                    ], MyONez.Base.AdditionalStuff.RenderProcessors.BloomRenderProcessor.BloomSettings);
                }
            }
        },
        fields: {
            BaseIntensity: 0,
            BaseSaturation: 0,
            BlurAmount: 0,
            Intensity: 0,
            Saturation: 0,
            Threshold: 0
        },
        ctors: {
            ctor: function (bloomThreshold, blurAmount, bloomIntensity, baseIntensity, bloomSaturation, baseSaturation) {
                this.$initialize();
                this.Threshold = bloomThreshold;
                this.BlurAmount = blurAmount;
                this.Intensity = bloomIntensity;
                this.BaseIntensity = baseIntensity;
                this.Saturation = bloomSaturation;
                this.BaseSaturation = baseSaturation;
            }
        }
    });

    Bridge.define("MyONez.Base.AdditionalStuff.Scenes.LoadingData", {
        props: {
            Count: 0,
            Enumerator: null
        }
    });

    Bridge.define("MyONez.Base.AdditionalStuff.Scenes.LoadingScene$1", function (T) { return {
        inherits: [SpineEngine.ECS.Scene],
        ctors: {
            ctor: function (loadings, width, height) {
                this.$initialize();
                SpineEngine.ECS.Scene.ctor.call(this);
                this.SetDesignResolution(width, height, SpineEngine.Graphics.ResolutionPolicy.SceneResolutionPolicy.None);
                SpineEngine.Core.Instance.Screen.SetSize(width, height);
                this.AddRenderer(SpineEngine.Graphics.Renderers.DefaultRenderer, new SpineEngine.Graphics.Renderers.DefaultRenderer());

                var progress = this.CreateEntity("progress");
                var progressComponent = progress.AddComponent(MyONez.Base.AdditionalStuff.Scenes.LoadingScene$1.ProgressComponent(T));
                progressComponent.Loadings = loadings;
                progressComponent.TotalItems = System.Linq.Enumerable.from(loadings).sum($asm.$.MyONez.Base.AdditionalStuff.Scenes.LoadingScene$1.f1);

                this.AddEntitySystem(new (MyONez.Base.AdditionalStuff.Scenes.LoadingScene$1.ProgressUpdateSystem(T))());
                this.AddEntitySystem(new (MyONez.Base.AdditionalStuff.Scenes.LoadingScene$1.ProgressMeshGeneratorSystem(T))());
            }
        }
    }; });

    Bridge.ns("MyONez.Base.AdditionalStuff.Scenes.LoadingScene$1", $asm.$);

    Bridge.apply($asm.$.MyONez.Base.AdditionalStuff.Scenes.LoadingScene$1, {
        f1: function (a) {
            return a.Count;
        }
    });

    Bridge.define("MyONez.Base.AdditionalStuff.Scenes.LoadingScene$1.ProgressComponent", function (T) { return {
        inherits: [LocomotorECS.Component],
        $kind: "nested class",
        fields: {
            CurrentLoading: 0,
            Loadings: null,
            TotalItems: 0,
            CurrentItem: 0
        }
    }; });

    Bridge.define("MyONez.Base.AdditionalStuff.Scenes.LoadingScene$1.ProgressMeshGeneratorSystem", function (T) { return {
        inherits: [LocomotorECS.EntityProcessingSystem],
        $kind: "nested class",
        ctors: {
            ctor: function () {
                this.$initialize();
                LocomotorECS.EntityProcessingSystem.ctor.call(this, new LocomotorECS.Matching.Matcher().All([MyONez.Base.AdditionalStuff.Scenes.LoadingScene$1.ProgressComponent(T)]));
            }
        },
        methods: {
            DoAction$1: function (entity, gameTime) {
                LocomotorECS.EntityProcessingSystem.prototype.DoAction$1.call(this, entity, gameTime);
                var progress = entity.GetComponent(MyONez.Base.AdditionalStuff.Scenes.LoadingScene$1.ProgressComponent(T));
                var finalRender = entity.GetOrCreateComponent(SpineEngine.ECS.Components.FinalRenderComponent);

                finalRender.Batch.Clear();

                if (progress.TotalItems === 0) {
                    return;
                }

                finalRender.Batch.Draw(SpineEngine.Graphics.Graphic.PixelTexture, new SpineEngine.Maths.RectangleF.$ctor2(99, ((SpineEngine.Core.Instance.Screen.Height - 101) | 0), ((SpineEngine.Core.Instance.Screen.Width - 198) | 0), 52), SpineEngine.Maths.RectangleF.op_Implicit$1(SpineEngine.Graphics.Graphic.PixelTexture.Bounds.$clone()), Microsoft.Xna.Framework.Color.Black.$clone());

                finalRender.Batch.Draw(SpineEngine.Graphics.Graphic.PixelTexture, new SpineEngine.Maths.RectangleF.$ctor2(100, ((SpineEngine.Core.Instance.Screen.Height - 100) | 0), progress.CurrentItem * (SpineEngine.Core.Instance.Screen.Width - 200.0) / progress.TotalItems, 50), SpineEngine.Maths.RectangleF.op_Implicit$1(SpineEngine.Graphics.Graphic.PixelTexture.Bounds.$clone()), Microsoft.Xna.Framework.Color.White.$clone());
            }
        }
    }; });

    Bridge.define("MyONez.Base.AdditionalStuff.Scenes.LoadingScene$1.ProgressUpdateSystem", function (T) { return {
        inherits: [LocomotorECS.EntityProcessingSystem],
        $kind: "nested class",
        ctors: {
            ctor: function () {
                this.$initialize();
                LocomotorECS.EntityProcessingSystem.ctor.call(this, new LocomotorECS.Matching.Matcher().All([MyONez.Base.AdditionalStuff.Scenes.LoadingScene$1.ProgressComponent(T)]));
            }
        },
        methods: {
            DoAction$1: function (entity, gameTime) {
                LocomotorECS.EntityProcessingSystem.prototype.DoAction$1.call(this, entity, gameTime);
                var progress = entity.GetComponent(MyONez.Base.AdditionalStuff.Scenes.LoadingScene$1.ProgressComponent(T));
                if (progress.Loadings.Count < progress.CurrentLoading) {
                    return;
                }

                if (progress.Loadings.Count === progress.CurrentLoading) {
                    progress.CurrentLoading = (progress.CurrentLoading + 1) | 0;
                    SpineEngine.Core.Instance.SwitchScene(Bridge.createInstance(T));
                    return;
                }

                var enumerator = progress.Loadings.getItem(progress.CurrentLoading).Enumerator;
                if (!enumerator.System$Collections$IEnumerator$moveNext()) {
                    progress.CurrentLoading = (progress.CurrentLoading + 1) | 0;
                    return;
                }

                progress.CurrentItem = (progress.CurrentItem + 1) | 0;
            }
        }
    }; });

    Bridge.define("MyONez.Base.AdditionalStuff.SceneTransitions.CinematicLetterboxTransition", {
        inherits: [SpineEngine.Graphics.Transitions.SceneTransition],
        fields: {
            tmpContentManager: null
        },
        props: {
            Duration: 0,
            Color: {
                get: function () {
                    return Bridge.cast(this.Effect, MyONez.Base.AdditionalStuff.Effects.LetterboxEffect).Color.$clone();
                },
                set: function (value) {
                    Bridge.cast(this.Effect, MyONez.Base.AdditionalStuff.Effects.LetterboxEffect).Color = value.$clone();
                }
            },
            LetterboxSize: {
                get: function () {
                    return Bridge.cast(this.Effect, MyONez.Base.AdditionalStuff.Effects.LetterboxEffect).LetterboxSize;
                },
                set: function (value) {
                    Bridge.cast(this.Effect, MyONez.Base.AdditionalStuff.Effects.LetterboxEffect).LetterboxSize = value;
                }
            }
        },
        ctors: {
            init: function () {
                this.tmpContentManager = new SpineEngine.XnaManagers.GlobalContentManager();
                this.Duration = 2;
            },
            ctor: function () {
                this.$initialize();
                SpineEngine.Graphics.Transitions.SceneTransition.ctor.call(this);
                this.Effect = this.tmpContentManager.Load(MyONez.Base.AdditionalStuff.Effects.LetterboxEffect, MyONez.Base.AdditionalStuff.Effects.LetterboxEffect.EffectAssetName);
            }
        },
        methods: {
            OnBeginTransition: function () {
                var $step = 0,
                    $jumpFromFinally,
                    $returnValue,
                    startAt,
                    elapsed,
                    elapsed1,
                    $async_e;

                var $enumerator = new Bridge.GeneratorEnumerator(Bridge.fn.bind(this, function () {
                    try {
                        for (;;) {
                            switch ($step) {
                                case 0: {
                                    startAt = System.DateTime.getNow();
                                    $step = 1;
                                    continue;
                                }
                                case 1: {
                                    if ( (System.DateTime.subdd(System.DateTime.getNow(), startAt)).getTotalSeconds() < this.Duration / 2 ) {
                                            $step = 2;
                                            continue;
                                        } 
                                        $step = 4;
                                        continue;
                                }
                                case 2: {
                                    elapsed = (System.DateTime.subdd(System.DateTime.getNow(), startAt)).getTotalSeconds();
                                        this.LetterboxSize = SpineEngine.Maths.Easing.Lerps.Ease$8(SpineEngine.Maths.Easing.EaseType.ExpoIn, 0, this.PreviousSceneRender.Bounds.Height, elapsed, this.Duration / 2);
                                        $enumerator.current = null;
                                        $step = 3;
                                        return true;
                                }
                                case 3: {
                                    
                                        $step = 1;
                                        continue;
                                }
                                case 4: {
                                    this.SetNextScene();

                                        startAt = System.DateTime.getNow();
                                    $step = 5;
                                    continue;
                                }
                                case 5: {
                                    if ( (System.DateTime.subdd(System.DateTime.getNow(), startAt)).getTotalSeconds() < this.Duration / 2 ) {
                                            $step = 6;
                                            continue;
                                        } 
                                        $step = 8;
                                        continue;
                                }
                                case 6: {
                                    elapsed1 = (System.DateTime.subdd(System.DateTime.getNow(), startAt)).getTotalSeconds();
                                        this.LetterboxSize = SpineEngine.Maths.Easing.Lerps.Ease$8(SpineEngine.Maths.Easing.EaseType.ExpoOut, this.PreviousSceneRender.Bounds.Height, 0, elapsed1, this.Duration / 2);
                                        $enumerator.current = null;
                                        $step = 7;
                                        return true;
                                }
                                case 7: {
                                    
                                        $step = 5;
                                        continue;
                                }
                                case 8: {
                                    this.TransitionComplete();

                                        // cleanup
                                        this.tmpContentManager.Unload();

                                }
                                default: {
                                    return false;
                                }
                            }
                        }
                    } catch($async_e1) {
                        $async_e = System.Exception.create($async_e1);
                        throw $async_e;
                    }
                }));
                return $enumerator;
            }
        }
    });

    Bridge.define("MyONez.Base.AdditionalStuff.SceneTransitions.FadeTransition", {
        inherits: [SpineEngine.Graphics.Transitions.SceneTransition],
        fields: {
            DelayBeforeFadeInDuration: 0,
            FadeEaseType: 0,
            FadeInDuration: 0,
            FadeOutDuration: 0,
            FadeToColor: null,
            fromColor: null,
            toColor: null,
            color: null
        },
        ctors: {
            init: function () {
                this.FadeToColor = new Microsoft.Xna.Framework.Color();
                this.fromColor = new Microsoft.Xna.Framework.Color();
                this.toColor = new Microsoft.Xna.Framework.Color();
                this.color = new Microsoft.Xna.Framework.Color();
                this.DelayBeforeFadeInDuration = 0.2;
                this.FadeEaseType = SpineEngine.Maths.Easing.EaseType.Linear;
                this.FadeInDuration = 0.8;
                this.FadeOutDuration = 0.8;
                this.FadeToColor = Microsoft.Xna.Framework.Color.Black.$clone();
                this.fromColor = Microsoft.Xna.Framework.Color.White.$clone();
                this.toColor = Microsoft.Xna.Framework.Color.Transparent.$clone();
            }
        },
        methods: {
            OnBeginTransition: function () {
                var $step = 0,
                    $jumpFromFinally,
                    $returnValue,
                    startAt,
                    elapsed,
                    elapsed1,
                    $async_e;

                var $enumerator = new Bridge.GeneratorEnumerator(Bridge.fn.bind(this, function () {
                    try {
                        for (;;) {
                            switch ($step) {
                                case 0: {
                                    startAt = System.DateTime.getNow();
                                    $step = 1;
                                    continue;
                                }
                                case 1: {
                                    if ( (System.DateTime.subdd(System.DateTime.getNow(), startAt)).getTotalSeconds() < this.FadeOutDuration ) {
                                            $step = 2;
                                            continue;
                                        } 
                                        $step = 4;
                                        continue;
                                }
                                case 2: {
                                    elapsed = (System.DateTime.subdd(System.DateTime.getNow(), startAt)).getTotalSeconds();
                                        this.color = SpineEngine.Maths.Easing.Lerps.Ease$1(this.FadeEaseType, Bridge.ref(this, "fromColor"), Bridge.ref(this, "toColor"), elapsed, this.FadeOutDuration);

                                        $enumerator.current = null;
                                        $step = 3;
                                        return true;
                                }
                                case 3: {
                                    
                                        $step = 1;
                                        continue;
                                }
                                case 4: {
                                    this.SetNextScene();

                                        $enumerator.current = SpineEngine.GlobalManagers.Coroutines.DefaultCoroutines.Wait(this.DelayBeforeFadeInDuration);
                                        $step = 5;
                                        return true;
                                }
                                case 5: {
                                    startAt = System.DateTime.getNow();
                                    $step = 6;
                                    continue;
                                }
                                case 6: {
                                    if ( (System.DateTime.subdd(System.DateTime.getNow(), startAt)).getTotalSeconds() < this.FadeInDuration ) {
                                            $step = 7;
                                            continue;
                                        } 
                                        $step = 9;
                                        continue;
                                }
                                case 7: {
                                    elapsed1 = (System.DateTime.subdd(System.DateTime.getNow(), startAt)).getTotalSeconds();
                                        this.color = SpineEngine.Maths.Easing.Lerps.Ease$1(SpineEngine.Maths.Easing.EaseHelper.OppositeEaseType(this.FadeEaseType), Bridge.ref(this, "toColor"), Bridge.ref(this, "fromColor"), elapsed1, this.FadeInDuration);

                                        $enumerator.current = null;
                                        $step = 8;
                                        return true;
                                }
                                case 8: {
                                    
                                        $step = 6;
                                        continue;
                                }
                                case 9: {
                                    this.TransitionComplete();

                                }
                                default: {
                                    return false;
                                }
                            }
                        }
                    } catch($async_e1) {
                        $async_e = System.Exception.create($async_e1);
                        throw $async_e;
                    }
                }));
                return $enumerator;
            },
            Render: function () {
                this.Batch.Clear();
                this.Batch.Draw(this.PreviousSceneRender, SpineEngine.Maths.RectangleF.op_Implicit$1(this.PreviousSceneRender.Bounds.$clone()), SpineEngine.Maths.RectangleF.op_Implicit$1(this.PreviousSceneRender.Bounds.$clone()), this.color.$clone(), 0);

                this.Material.Effect = this.Effect;

                SpineEngine.Graphics.Graphic.Draw(null, Microsoft.Xna.Framework.Color.Black.$clone(), this.Batch, this.Material);
            }
        }
    });

    Bridge.define("MyONez.Base.AdditionalStuff.SceneTransitions.SquaresTransition", {
        inherits: [SpineEngine.Graphics.Transitions.SceneTransition],
        fields: {
            tmpContentManager: null,
            DelayBeforeSquaresInDuration: 0,
            EaseType: 0,
            SquaresInDuration: 0,
            SquaresOutDuration: 0
        },
        props: {
            SquareColor: {
                set: function (value) {
                    Bridge.cast(this.Effect, MyONez.Base.AdditionalStuff.Effects.SquaresEffect).Color = value.$clone();
                }
            },
            Smoothness: {
                set: function (value) {
                    Bridge.cast(this.Effect, MyONez.Base.AdditionalStuff.Effects.SquaresEffect).Smoothness = value;
                }
            },
            Size: {
                set: function (value) {
                    Bridge.cast(this.Effect, MyONez.Base.AdditionalStuff.Effects.SquaresEffect).Size = value.$clone();
                }
            }
        },
        ctors: {
            init: function () {
                this.tmpContentManager = new SpineEngine.XnaManagers.GlobalContentManager();
                this.DelayBeforeSquaresInDuration = 0;
                this.EaseType = SpineEngine.Maths.Easing.EaseType.QuartOut;
                this.SquaresInDuration = 0.6;
                this.SquaresOutDuration = 0.6;
            },
            ctor: function () {
                this.$initialize();
                SpineEngine.Graphics.Transitions.SceneTransition.ctor.call(this);
                this.Effect = this.tmpContentManager.Load(MyONez.Base.AdditionalStuff.Effects.SquaresEffect, MyONez.Base.AdditionalStuff.Effects.SquaresEffect.EffectAssetName);
                this.SquareColor = Microsoft.Xna.Framework.Color.Black.$clone();
                this.Smoothness = 0.5;

                var aspectRatio = SpineEngine.Core.Instance.Screen.Width / SpineEngine.Core.Instance.Screen.Height;
                this.Size = new Microsoft.Xna.Framework.Vector2.$ctor2(30, 30 / aspectRatio);
            }
        },
        methods: {
            OnBeginTransition: function () {
                var $step = 0,
                    $jumpFromFinally,
                    $returnValue,
                    $async_e;

                var $enumerator = new Bridge.GeneratorEnumerator(Bridge.fn.bind(this, function () {
                    try {
                        for (;;) {
                            switch ($step) {
                                case 0: {
                                    $enumerator.current = this.TickEffectProgressProperty(Bridge.cast(this.Effect, MyONez.Base.AdditionalStuff.Effects.SquaresEffect), this.SquaresInDuration, this.EaseType);
                                        $step = 1;
                                        return true;
                                }
                                case 1: {
                                    this.SetNextScene();

                                        $enumerator.current = SpineEngine.GlobalManagers.Coroutines.DefaultCoroutines.Wait(this.DelayBeforeSquaresInDuration);
                                        $step = 2;
                                        return true;
                                }
                                case 2: {
                                    $enumerator.current = this.TickEffectProgressProperty(Bridge.cast(this.Effect, MyONez.Base.AdditionalStuff.Effects.SquaresEffect), this.SquaresOutDuration, SpineEngine.Maths.Easing.EaseHelper.OppositeEaseType(this.EaseType), true);
                                        $step = 3;
                                        return true;
                                }
                                case 3: {
                                    this.TransitionComplete();

                                        // cleanup
                                        this.Effect.Dispose();
                                        this.tmpContentManager.Unload();

                                }
                                default: {
                                    return false;
                                }
                            }
                        }
                    } catch($async_e1) {
                        $async_e = System.Exception.create($async_e1);
                        throw $async_e;
                    }
                }));
                return $enumerator;
            }
        }
    });

    /** @namespace MyONez.Base.AdditionalStuff.SceneTransitions */

    /**
     * Uses a texture (TransitionTexture) to control a wipe animation. The blue channel of the texture determines if color
         is shown or the previous scenes render. Sample textures are based on: https://www.youtube.com/watch?v=LnAoD7hgDxw
     *
     * @public
     * @class MyONez.Base.AdditionalStuff.SceneTransitions.TextureWipeTransition
     * @augments SpineEngine.Graphics.Transitions.SceneTransition
     */
    Bridge.define("MyONez.Base.AdditionalStuff.SceneTransitions.TextureWipeTransition", {
        inherits: [SpineEngine.Graphics.Transitions.SceneTransition],
        fields: {
            tmpContentManager: null,
            Duration: 0,
            EaseType: 0
        },
        props: {
            Opacity: {
                set: function (value) {
                    Bridge.cast(this.Effect, MyONez.Base.AdditionalStuff.Effects.TextureWipeEffect).Opacity = value;
                }
            },
            WipeColor: {
                set: function (value) {
                    Bridge.cast(this.Effect, MyONez.Base.AdditionalStuff.Effects.TextureWipeEffect).Color = value.$clone();
                }
            },
            TransitionTexture: {
                set: function (value) {
                    Bridge.cast(this.Effect, MyONez.Base.AdditionalStuff.Effects.TextureWipeEffect).Texture = value;
                }
            },
            UseRedGreenChannelsForDistortion: {
                set: function (value) {
                    this.Effect.CurrentTechnique = this.Effect.Techniques.getItem$1(value ? "TextureWipeWithDistort" : "TextureWipe");
                }
            }
        },
        ctors: {
            init: function () {
                this.tmpContentManager = new SpineEngine.XnaManagers.GlobalContentManager();
                this.Duration = 1.0;
                this.EaseType = SpineEngine.Maths.Easing.EaseType.Linear;
            },
            /**
             * Examples for textures can be found here:
                 ContentPaths.Textures.TextureWipeTransition.*
             *
             * @instance
             * @public
             * @this MyONez.Base.AdditionalStuff.SceneTransitions.TextureWipeTransition
             * @memberof MyONez.Base.AdditionalStuff.SceneTransitions.TextureWipeTransition
             * @param   {Microsoft.Xna.Framework.Graphics.Texture2D}    transitionTexture
             * @return  {void}
             */
            ctor: function (transitionTexture) {
                this.$initialize();
                SpineEngine.Graphics.Transitions.SceneTransition.ctor.call(this);
                this.Effect = this.tmpContentManager.Load(MyONez.Base.AdditionalStuff.Effects.TextureWipeEffect, MyONez.Base.AdditionalStuff.Effects.TextureWipeEffect.EffectAssetName);
                this.Opacity = 1.0;
                this.WipeColor = Microsoft.Xna.Framework.Color.Black.$clone();
                this.TransitionTexture = transitionTexture;
            }
        },
        methods: {
            OnBeginTransition: function () {
                var $step = 0,
                    $jumpFromFinally,
                    $returnValue,
                    $async_e;

                var $enumerator = new Bridge.GeneratorEnumerator(Bridge.fn.bind(this, function () {
                    try {
                        for (;;) {
                            switch ($step) {
                                case 0: {
                                    $enumerator.current = this.TickEffectProgressProperty(Bridge.cast(this.Effect, MyONez.Base.AdditionalStuff.Effects.TextureWipeEffect), this.Duration, this.EaseType);
                                        $step = 1;
                                        return true;
                                }
                                case 1: {
                                    this.SetNextScene();

                                        this.TransitionComplete();

                                        this.tmpContentManager.Unload();

                                }
                                default: {
                                    return false;
                                }
                            }
                        }
                    } catch($async_e1) {
                        $async_e = System.Exception.create($async_e1);
                        throw $async_e;
                    }
                }));
                return $enumerator;
            }
        }
    });

    Bridge.define("MyONez.Base.AdditionalStuff.SceneTransitions.TransformTransition", {
        inherits: [SpineEngine.Graphics.Transitions.SceneTransition],
        fields: {
            destinationRect: null,
            Duration: 0,
            finalRenderRect: null,
            TransitionEaseType: 0
        },
        ctors: {
            init: function () {
                this.destinationRect = new Microsoft.Xna.Framework.Rectangle();
                this.finalRenderRect = new Microsoft.Xna.Framework.Rectangle();
                this.Duration = 1.0;
                this.TransitionEaseType = SpineEngine.Maths.Easing.EaseType.QuartIn;
            },
            ctor: function (transitionType) {
                if (transitionType === void 0) { transitionType = 0; }

                this.$initialize();
                SpineEngine.Graphics.Transitions.SceneTransition.ctor.call(this);
                this.destinationRect = this.PreviousSceneRender.Bounds.$clone();

                switch (transitionType) {
                    case MyONez.Base.AdditionalStuff.SceneTransitions.TransformTransition.TransformTransitionType.ZoomOut: 
                        this.finalRenderRect = new Microsoft.Xna.Framework.Rectangle.$ctor2(((Bridge.Int.div(SpineEngine.Core.Instance.Screen.Width, 2)) | 0), ((Bridge.Int.div(SpineEngine.Core.Instance.Screen.Height, 2)) | 0), 0, 0);
                        break;
                    case MyONez.Base.AdditionalStuff.SceneTransitions.TransformTransition.TransformTransitionType.ZoomIn: 
                        this.finalRenderRect = new Microsoft.Xna.Framework.Rectangle.$ctor2(Bridge.Int.mul(((-SpineEngine.Core.Instance.Screen.Width) | 0), 5), Bridge.Int.mul(((-SpineEngine.Core.Instance.Screen.Height) | 0), 5), Bridge.Int.mul(this.destinationRect.Width, 10), Bridge.Int.mul(this.destinationRect.Height, 10));
                        break;
                    case MyONez.Base.AdditionalStuff.SceneTransitions.TransformTransition.TransformTransitionType.SlideRight: 
                        this.finalRenderRect = new Microsoft.Xna.Framework.Rectangle.$ctor2(SpineEngine.Core.Instance.Screen.Width, 0, this.destinationRect.Width, this.destinationRect.Height);
                        break;
                    case MyONez.Base.AdditionalStuff.SceneTransitions.TransformTransition.TransformTransitionType.SlideLeft: 
                        this.finalRenderRect = new Microsoft.Xna.Framework.Rectangle.$ctor2(((-SpineEngine.Core.Instance.Screen.Width) | 0), 0, this.destinationRect.Width, this.destinationRect.Height);
                        break;
                    case MyONez.Base.AdditionalStuff.SceneTransitions.TransformTransition.TransformTransitionType.SlideUp: 
                        this.finalRenderRect = new Microsoft.Xna.Framework.Rectangle.$ctor2(0, ((-SpineEngine.Core.Instance.Screen.Height) | 0), this.destinationRect.Width, this.destinationRect.Height);
                        break;
                    case MyONez.Base.AdditionalStuff.SceneTransitions.TransformTransition.TransformTransitionType.SlideDown: 
                        this.finalRenderRect = new Microsoft.Xna.Framework.Rectangle.$ctor2(0, SpineEngine.Core.Instance.Screen.Height, this.destinationRect.Width, this.destinationRect.Height);
                        break;
                    case MyONez.Base.AdditionalStuff.SceneTransitions.TransformTransition.TransformTransitionType.SlideBottomRight: 
                        this.finalRenderRect = new Microsoft.Xna.Framework.Rectangle.$ctor2(SpineEngine.Core.Instance.Screen.Width, SpineEngine.Core.Instance.Screen.Height, this.destinationRect.Width, this.destinationRect.Height);
                        break;
                    case MyONez.Base.AdditionalStuff.SceneTransitions.TransformTransition.TransformTransitionType.SlideBottomLeft: 
                        this.finalRenderRect = new Microsoft.Xna.Framework.Rectangle.$ctor2(((-SpineEngine.Core.Instance.Screen.Width) | 0), SpineEngine.Core.Instance.Screen.Height, this.destinationRect.Width, this.destinationRect.Height);
                        break;
                    case MyONez.Base.AdditionalStuff.SceneTransitions.TransformTransition.TransformTransitionType.SlideTopRight: 
                        this.finalRenderRect = new Microsoft.Xna.Framework.Rectangle.$ctor2(SpineEngine.Core.Instance.Screen.Width, ((-SpineEngine.Core.Instance.Screen.Height) | 0), this.destinationRect.Width, this.destinationRect.Height);
                        break;
                    case MyONez.Base.AdditionalStuff.SceneTransitions.TransformTransition.TransformTransitionType.SlideTopLeft: 
                        this.finalRenderRect = new Microsoft.Xna.Framework.Rectangle.$ctor2(((-SpineEngine.Core.Instance.Screen.Width) | 0), ((-SpineEngine.Core.Instance.Screen.Height) | 0), this.destinationRect.Width, this.destinationRect.Height);
                        break;
                }
            }
        },
        methods: {
            OnBeginTransition: function () {
                var $step = 0,
                    $jumpFromFinally,
                    $returnValue,
                    startAt,
                    elapsed,
                    elapsed1,
                    $async_e;

                var $enumerator = new Bridge.GeneratorEnumerator(Bridge.fn.bind(this, function () {
                    try {
                        for (;;) {
                            switch ($step) {
                                case 0: {
                                    $enumerator.current = null;
                                        $step = 1;
                                        return true;
                                }
                                case 1: {
                                    startAt = System.DateTime.getNow();
                                    $step = 2;
                                    continue;
                                }
                                case 2: {
                                    if ( (System.DateTime.subdd(System.DateTime.getNow(), startAt)).getTotalSeconds() < this.Duration ) {
                                            $step = 3;
                                            continue;
                                        } 
                                        $step = 5;
                                        continue;
                                }
                                case 3: {
                                    elapsed = (System.DateTime.subdd(System.DateTime.getNow(), startAt)).getTotalSeconds();
                                        this.destinationRect = SpineEngine.Maths.Easing.Lerps.Ease$3(this.TransitionEaseType, this.PreviousSceneRender.Bounds.$clone(), this.finalRenderRect.$clone(), elapsed, this.Duration);

                                        $enumerator.current = null;
                                        $step = 4;
                                        return true;
                                }
                                case 4: {
                                    
                                        $step = 2;
                                        continue;
                                }
                                case 5: {
                                    this.SetNextScene();

                                        startAt = System.DateTime.getNow();
                                    $step = 6;
                                    continue;
                                }
                                case 6: {
                                    if ( (System.DateTime.subdd(System.DateTime.getNow(), startAt)).getTotalSeconds() < this.Duration ) {
                                            $step = 7;
                                            continue;
                                        } 
                                        $step = 9;
                                        continue;
                                }
                                case 7: {
                                    elapsed1 = (System.DateTime.subdd(System.DateTime.getNow(), startAt)).getTotalSeconds();
                                        this.destinationRect = SpineEngine.Maths.Easing.Lerps.Ease$3(this.TransitionEaseType, this.finalRenderRect.$clone(), this.PreviousSceneRender.Bounds.$clone(), elapsed1, this.Duration);

                                        $enumerator.current = null;
                                        $step = 8;
                                        return true;
                                }
                                case 8: {
                                    
                                        $step = 6;
                                        continue;
                                }
                                case 9: {
                                    this.TransitionComplete();

                                }
                                default: {
                                    return false;
                                }
                            }
                        }
                    } catch($async_e1) {
                        $async_e = System.Exception.create($async_e1);
                        throw $async_e;
                    }
                }));
                return $enumerator;
            },
            Render: function () {
                this.Batch.Clear();
                this.Batch.Draw(this.PreviousSceneRender, SpineEngine.Maths.RectangleF.op_Implicit$1(this.destinationRect.$clone()), SpineEngine.Maths.RectangleF.op_Implicit$1(this.PreviousSceneRender.Bounds.$clone()), Microsoft.Xna.Framework.Color.White.$clone(), 0);
                this.Material.Effect = this.Effect;

                SpineEngine.Graphics.Graphic.Draw(null, Microsoft.Xna.Framework.Color.Black.$clone(), this.Batch, this.Material);
            }
        }
    });

    Bridge.define("MyONez.Base.AdditionalStuff.SceneTransitions.TransformTransition.TransformTransitionType", {
        $kind: "nested enum",
        statics: {
            fields: {
                ZoomOut: 0,
                ZoomIn: 1,
                SlideRight: 2,
                SlideLeft: 3,
                SlideUp: 4,
                SlideDown: 5,
                SlideBottomRight: 6,
                SlideBottomLeft: 7,
                SlideTopRight: 8,
                SlideTopLeft: 9
            }
        }
    });

    Bridge.define("MyONez.Base.AdditionalStuff.SceneTransitions.WindTransition", {
        inherits: [SpineEngine.Graphics.Transitions.SceneTransition],
        fields: {
            tmpContentManager: null,
            Duration: 0,
            EaseType: 0
        },
        props: {
            WindSegments: {
                set: function (value) {
                    Bridge.cast(this.Effect, MyONez.Base.AdditionalStuff.Effects.WindEffect).Segments = value;
                }
            },
            Size: {
                set: function (value) {
                    Bridge.cast(this.Effect, MyONez.Base.AdditionalStuff.Effects.WindEffect).Size = value;
                }
            }
        },
        ctors: {
            init: function () {
                this.tmpContentManager = new SpineEngine.XnaManagers.GlobalContentManager();
                this.Duration = 1.0;
                this.EaseType = SpineEngine.Maths.Easing.EaseType.QuartOut;
            },
            ctor: function () {
                this.$initialize();
                SpineEngine.Graphics.Transitions.SceneTransition.ctor.call(this);
                this.Effect = this.tmpContentManager.Load(MyONez.Base.AdditionalStuff.Effects.WindEffect, MyONez.Base.AdditionalStuff.Effects.WindEffect.EffectAssetName);
                this.Size = 0.3;
                this.WindSegments = 100;
            }
        },
        methods: {
            OnBeginTransition: function () {
                var $step = 0,
                    $jumpFromFinally,
                    $returnValue,
                    $async_e;

                var $enumerator = new Bridge.GeneratorEnumerator(Bridge.fn.bind(this, function () {
                    try {
                        for (;;) {
                            switch ($step) {
                                case 0: {
                                    $enumerator.current = this.TickEffectProgressProperty(Bridge.cast(this.Effect, MyONez.Base.AdditionalStuff.Effects.WindEffect), this.Duration, this.EaseType);
                                        $step = 1;
                                        return true;
                                }
                                case 1: {
                                    this.SetNextScene();

                                        this.TransitionComplete();

                                        this.tmpContentManager.Unload();

                                }
                                default: {
                                    return false;
                                }
                            }
                        }
                    } catch($async_e1) {
                        $async_e = System.Exception.create($async_e1);
                        throw $async_e;
                    }
                }));
                return $enumerator;
            }
        }
    });

    Bridge.define("MyONez.Base.AdditionalStuff.TiledMap.ECS.Components.TiledMapComponent", {
        inherits: [LocomotorECS.Component],
        fields: {
            LayerIndicesToRender: null
        },
        props: {
            TiledMap: null
        },
        ctors: {
            ctor: function (tiledMap) {
                this.$initialize();
                LocomotorECS.Component.ctor.call(this);
                this.TiledMap = tiledMap;
            }
        },
        methods: {
            SetLayerToRender: function (layerName) {
                this.LayerIndicesToRender = System.Array.init(1, 0, System.Int32);
                this.LayerIndicesToRender[System.Array.index(0, this.LayerIndicesToRender)] = this.TiledMap.GetLayerIndex(layerName);
            },
            SetLayersToRender: function (layerNames) {
                if (layerNames === void 0) { layerNames = []; }
                this.LayerIndicesToRender = System.Array.init(layerNames.length, 0, System.Int32);

                for (var i = 0; i < layerNames.length; i = (i + 1) | 0) {
                    this.LayerIndicesToRender[System.Array.index(i, this.LayerIndicesToRender)] = this.TiledMap.GetLayerIndex(layerNames[System.Array.index(i, layerNames)]);
                }
            }
        }
    });

    Bridge.define("MyONez.Base.AdditionalStuff.TiledMap.ECS.EntitySystems.TiledMapMeshGeneratorSystem", {
        inherits: [LocomotorECS.EntityProcessingSystem],
        fields: {
            scene: null
        },
        ctors: {
            ctor: function (scene) {
                this.$initialize();
                LocomotorECS.EntityProcessingSystem.ctor.call(this, new LocomotorECS.Matching.Matcher().All([MyONez.Base.AdditionalStuff.TiledMap.ECS.Components.TiledMapComponent]));
                this.scene = scene;
            }
        },
        methods: {
            DoAction$1: function (entity, gameTime) {
                var $t, $t1;
                LocomotorECS.EntityProcessingSystem.prototype.DoAction$1.call(this, entity, gameTime);
                var map = entity.GetComponent(MyONez.Base.AdditionalStuff.TiledMap.ECS.Components.TiledMapComponent);
                var depth = ($t = (($t1 = entity.GetComponent(SpineEngine.ECS.Components.DepthLayerComponent)) != null ? $t1.Depth : null), $t != null ? $t : 0);

                var finalRender = entity.GetComponent(SpineEngine.ECS.Components.FinalRenderComponent);
                if (finalRender == null) {
                    finalRender = entity.AddComponent(SpineEngine.ECS.Components.FinalRenderComponent);
                }
                finalRender.Batch.Clear();

                var transformMatrix = SpineEngine.Maths.TransformationUtils.GetTransformation(entity).LocalTransformMatrix.$clone();
                this.Draw(map, depth, finalRender.Batch, transformMatrix.$clone());
            },
            Draw: function (map, layerDepth, batch, transformMatrix) {
                if (map.TiledMap.Orientation !== MyONez.Base.AdditionalStuff.TiledMap.Models.TiledMapOrientation.Orthogonal) {
                    throw new System.NotImplementedException.ctor();
                }

                for (var i = 0; i < map.TiledMap.Layers.Count; i = (i + 1) | 0) {
                    if (!map.TiledMap.Layers.getItem(i).Visible || (map.LayerIndicesToRender != null && !System.Array.contains(map.LayerIndicesToRender, i, System.Int32))) {
                        continue;
                    }

                    var layer = Bridge.cast(map.TiledMap.Layers.getItem(i), MyONez.Base.AdditionalStuff.TiledMap.Models.TiledTileLayer);
                    for (var y = 0; y < layer.Height; y = (y + 1) | 0) {
                        for (var x = 0; x < layer.Width; x = (x + 1) | 0) {
                            var tile = { v : layer.GetTile(x, y) };
                            if (tile.v == null) {
                                continue;
                            }

                            if (tile.v.TileSet == null || tile.v.TileSetTile == null || tile.v.OldId !== tile.v.Id) {
                                tile.v.OldId = tile.v.Id;
                                tile.v.TileSet = System.Linq.Enumerable.from(map.TiledMap.TileSets).first((function ($me, tile) {
                                        return function (a) {
                                            return System.Linq.Enumerable.from(a.Tiles).any(function (b) {
                                                    return ((b.Id + a.FirstGid) | 0) === tile.v.Id;
                                                });
                                        };
                                    })(this, tile));
                                tile.v.TileSetTile = System.Linq.Enumerable.from(tile.v.TileSet.Tiles).first((function ($me, tile) {
                                        return function (b) {
                                            return ((b.Id + tile.v.TileSet.FirstGid) | 0) === tile.v.Id;
                                        };
                                    })(this, tile));
                                tile.v.RenderTileSetTile = tile.v.TileSetTile;
                                tile.v.CurrentFrame = 0;
                                tile.v.ElapsedTime = 0;
                            }

                            // for the y position, we need to take into account if the tile is larger than the tileHeight and shift. Tiled uses
                            // a bottom-left coordinate system and MonoGame a top-left
                            var tx = Bridge.Int.mul(x, map.TiledMap.TileWidth);
                            var ty = Bridge.Int.mul(y, map.TiledMap.TileHeight);
                            var rotation = 0.0;

                            var spriteEffects = Microsoft.Xna.Framework.Graphics.SpriteEffects.None;
                            if (tile.v.FlippedHorizonally) {
                                spriteEffects |= Microsoft.Xna.Framework.Graphics.SpriteEffects.FlipHorizontally;
                            }
                            if (tile.v.FlippedVertically) {
                                spriteEffects |= Microsoft.Xna.Framework.Graphics.SpriteEffects.FlipVertically;
                            }
                            if (tile.v.FlippedDiagonally) {
                                if (tile.v.FlippedHorizonally && tile.v.FlippedVertically) {
                                    spriteEffects ^= Microsoft.Xna.Framework.Graphics.SpriteEffects.FlipVertically;
                                    rotation = Microsoft.Xna.Framework.MathHelper.PiOver2;
                                    tx = (tx + (((map.TiledMap.TileHeight + (((tile.v.RenderTileSetTile.SourceRect.Height - map.TiledMap.TileHeight) | 0))) | 0))) | 0;
                                    ty = (ty - (((tile.v.RenderTileSetTile.SourceRect.Width - map.TiledMap.TileWidth) | 0))) | 0;
                                } else if (tile.v.FlippedHorizonally) {
                                    spriteEffects ^= Microsoft.Xna.Framework.Graphics.SpriteEffects.FlipVertically;
                                    rotation = -1.57079637;
                                    ty = (ty + map.TiledMap.TileHeight) | 0;
                                } else if (tile.v.FlippedVertically) {
                                    spriteEffects ^= Microsoft.Xna.Framework.Graphics.SpriteEffects.FlipHorizontally;
                                    rotation = Microsoft.Xna.Framework.MathHelper.PiOver2;
                                    tx = (tx + (((map.TiledMap.TileWidth + (((tile.v.RenderTileSetTile.SourceRect.Height - map.TiledMap.TileHeight) | 0))) | 0))) | 0;
                                    ty = (ty + (((map.TiledMap.TileWidth - tile.v.RenderTileSetTile.SourceRect.Width) | 0))) | 0;
                                } else {
                                    spriteEffects ^= Microsoft.Xna.Framework.Graphics.SpriteEffects.FlipHorizontally;
                                    rotation = -1.57079637;
                                    ty = (ty + map.TiledMap.TileHeight) | 0;
                                }
                            }

                            // if we had no rotations (diagonal flipping) shift our y-coord to account for any non-tileSized tiles to account for
                            // Tiled being bottom-left origin
                            if (rotation === 0) {
                                ty = (ty + (((map.TiledMap.TileHeight - tile.v.RenderTileSetTile.SourceRect.Height) | 0))) | 0;
                            }

                            var destRect = tile.v.RenderTileSetTile.SourceRect.$clone();
                            destRect.Location = new Microsoft.Xna.Framework.Point.$ctor2(0, 0);

                            var meshItem = batch.Draw(tile.v.TileSet.ImageTexture, SpineEngine.Maths.RectangleF.op_Implicit$1(destRect.$clone()), SpineEngine.Maths.RectangleF.op_Implicit$1(tile.v.RenderTileSetTile.SourceRect.$clone()), Microsoft.Xna.Framework.Color.White.$clone(), layerDepth);
                            meshItem.RotateMesh$1(rotation);
                            meshItem.ApplyEffectToMesh(spriteEffects);
                            meshItem.MoveMesh(new Microsoft.Xna.Framework.Vector3.$ctor3(tx + layer.Offset.X, ty + layer.Offset.Y, 0));
                            meshItem.ApplyTransformMesh(transformMatrix.$clone());
                        }
                    }
                }
            }
        }
    });

    Bridge.define("MyONez.Base.AdditionalStuff.TiledMap.ECS.EntitySystems.TiledMapUpdateSystem", {
        inherits: [LocomotorECS.EntityProcessingSystem],
        ctors: {
            ctor: function () {
                this.$initialize();
                LocomotorECS.EntityProcessingSystem.ctor.call(this, new LocomotorECS.Matching.Matcher().All([MyONez.Base.AdditionalStuff.TiledMap.ECS.Components.TiledMapComponent]));
            }
        },
        methods: {
            DoAction$1: function (entity, gameTime) {
                var $t;
                LocomotorECS.EntityProcessingSystem.prototype.DoAction$1.call(this, entity, gameTime);

                var map = entity.GetComponent(MyONez.Base.AdditionalStuff.TiledMap.ECS.Components.TiledMapComponent);

                for (var i = 0; i < map.TiledMap.Layers.Count; i = (i + 1) | 0) {
                    var layer = Bridge.cast(map.TiledMap.Layers.getItem(i), MyONez.Base.AdditionalStuff.TiledMap.Models.TiledTileLayer);
                    for (var j = 0; j < layer.Tiles.length; j = (j + 1) | 0) {
                        var tile = layer.Tiles[System.Array.index(j, layer.Tiles)];

                        if ((tile != null && ($t = tile.TileSetTile) != null ? $t.AnimationFrames : null) == null || tile.TileSet == null) {
                            continue;
                        }

                        tile.ElapsedTime += gameTime.getMilliseconds();

                        if (!(tile.ElapsedTime > tile.TileSetTile.AnimationFrames.getItem(tile.CurrentFrame).Duration)) {
                            continue;
                        }

                        tile.CurrentFrame = SpineEngine.Maths.Mathf.IncrementWithWrap(tile.CurrentFrame, tile.TileSetTile.AnimationFrames.Count);
                        tile.ElapsedTime = 0;
                        var tileId = { v : tile.TileSetTile.AnimationFrames.getItem(tile.CurrentFrame).TileId };

                        tile.RenderTileSetTile = System.Linq.Enumerable.from(tile.TileSet.Tiles).first((function ($me, tileId) {
                                return function (a) {
                                    return a.Id === tileId.v;
                                };
                            })(this, tileId));
                    }
                }
            }
        }
    });

    Bridge.define("MyONez.Base.AdditionalStuff.TiledMap.Models.TiledLayer", {
        fields: {
            Offset: null,
            Name: null,
            Properties: null,
            Visible: false,
            Opacity: 0
        },
        ctors: {
            init: function () {
                this.Offset = new Microsoft.Xna.Framework.Vector2();
                this.Properties = new (System.Collections.Generic.Dictionary$2(System.String,System.String))();
                this.Visible = true;
            }
        }
    });

    Bridge.define("MyONez.Base.AdditionalStuff.TiledMap.Models.TiledLayerType", {
        $kind: "enum",
        statics: {
            fields: {
                Tile: 0,
                Image: 1
            }
        }
    });

    Bridge.define("MyONez.Base.AdditionalStuff.TiledMap.Models.TiledMap", {
        fields: {
            FirstGid: 0,
            Width: 0,
            Height: 0,
            TileWidth: 0,
            TileHeight: 0,
            BackgroundColor: null,
            RenderOrder: 0,
            Orientation: 0,
            Properties: null,
            Layers: null,
            ObjectGroups: null,
            TileSets: null
        },
        ctors: {
            init: function () {
                this.Properties = new (System.Collections.Generic.Dictionary$2(System.String,System.String))();
                this.Layers = new (System.Collections.Generic.List$1(MyONez.Base.AdditionalStuff.TiledMap.Models.TiledLayer)).ctor();
                this.ObjectGroups = new (System.Collections.Generic.List$1(MyONez.Base.AdditionalStuff.TiledMap.Models.TiledObjectGroup)).ctor();
                this.TileSets = new (System.Collections.Generic.List$1(MyONez.Base.AdditionalStuff.TiledMap.Models.TiledTileSet)).ctor();
            }
        },
        methods: {
            GetLayerIndex: function (name) {
                for (var i = 0; i < this.Layers.Count; i = (i + 1) | 0) {
                    if (Bridge.referenceEquals(this.Layers.getItem(i).Name, name)) {
                        return i;
                    }
                }

                throw new System.Exception("could not find the layer: " + (name || ""));
            },
            GetLayer: function (name) {
                for (var i = 0; i < this.Layers.Count; i = (i + 1) | 0) {
                    if (Bridge.referenceEquals(this.Layers.getItem(i).Name, name)) {
                        return this.Layers.getItem(i);
                    }
                }
                return null;
            },
            GetObjectGroup: function (name) {
                for (var i = 0; i < this.ObjectGroups.Count; i = (i + 1) | 0) {
                    if (Bridge.referenceEquals(this.ObjectGroups.getItem(i).Name, name)) {
                        return this.ObjectGroups.getItem(i);
                    }
                }
                return null;
            },
            WorldToTilePosition: function (pos, clampToTilemapBounds) {
                if (clampToTilemapBounds === void 0) { clampToTilemapBounds = true; }
                return new Microsoft.Xna.Framework.Point.$ctor2(this.WorldToTilePositionX(pos.X, clampToTilemapBounds), this.WorldToTilePositionY(pos.Y, clampToTilemapBounds));
            },
            WorldToTilePositionX: function (x, clampToTilemapBounds) {
                if (clampToTilemapBounds === void 0) { clampToTilemapBounds = true; }
                var tileX = SpineEngine.Maths.Mathf.FastFloorToInt(x / this.TileWidth);
                if (!clampToTilemapBounds) {
                    return tileX;
                }
                return SpineEngine.Maths.Mathf.Clamp(tileX, 0, ((this.Width - 1) | 0));
            },
            WorldToTilePositionY: function (y, clampToTilemapBounds) {
                if (clampToTilemapBounds === void 0) { clampToTilemapBounds = true; }
                var tileY = SpineEngine.Maths.Mathf.FastFloorToInt(y / this.TileHeight);
                if (!clampToTilemapBounds) {
                    return tileY;
                }
                return SpineEngine.Maths.Mathf.Clamp(tileY, 0, ((this.Height - 1) | 0));
            },
            TileToWorldPositionX: function (x) {
                return Bridge.Int.mul(x, this.TileWidth);
            },
            TileToWorldPositionY: function (y) {
                return Bridge.Int.mul(y, this.TileHeight);
            }
        }
    });

    Bridge.define("MyONez.Base.AdditionalStuff.TiledMap.Models.TiledMapOrientation", {
        $kind: "enum",
        statics: {
            fields: {
                Orthogonal: 1,
                Isometric: 2,
                Staggered: 3
            }
        }
    });

    Bridge.define("MyONez.Base.AdditionalStuff.TiledMap.Models.TiledObject", {
        fields: {
            Id: 0,
            Name: null,
            Type: null,
            X: 0,
            Y: 0,
            Width: 0,
            Height: 0,
            Rotation: 0,
            Gid: 0,
            Visible: false,
            TiledObjectType: 0,
            ObjectType: null,
            PolyPoints: null,
            Properties: null
        },
        ctors: {
            init: function () {
                this.PolyPoints = new (System.Collections.Generic.List$1(Microsoft.Xna.Framework.Vector2)).ctor();
                this.Properties = new (System.Collections.Generic.Dictionary$2(System.String,System.String))();
            }
        }
    });

    Bridge.define("MyONez.Base.AdditionalStuff.TiledMap.Models.TiledObject.TiledObjectTypes", {
        $kind: "nested enum",
        statics: {
            fields: {
                None: 0,
                Ellipse: 1,
                Image: 2,
                Polygon: 3,
                Polyline: 4
            }
        }
    });

    Bridge.define("MyONez.Base.AdditionalStuff.TiledMap.Models.TiledObjectGroup", {
        fields: {
            Name: null,
            Color: null,
            Opacity: 0,
            Visible: false,
            Properties: null,
            Objects: null
        },
        ctors: {
            init: function () {
                this.Color = new Microsoft.Xna.Framework.Color();
                this.Properties = new (System.Collections.Generic.Dictionary$2(System.String,System.String))();
            }
        },
        methods: {
            ObjectWithName: function (name) {
                for (var i = 0; i < this.Objects.Count; i = (i + 1) | 0) {
                    if (Bridge.referenceEquals(this.Objects.getItem(i).Name, name)) {
                        return this.Objects.getItem(i);
                    }
                }
                return null;
            },
            ObjectsWithName: function (name) {
                var list = new (System.Collections.Generic.List$1(MyONez.Base.AdditionalStuff.TiledMap.Models.TiledObject)).ctor();
                for (var i = 0; i < this.Objects.Count; i = (i + 1) | 0) {
                    if (Bridge.referenceEquals(this.Objects.getItem(i).Name, name)) {
                        list.add(this.Objects.getItem(i));
                    }
                }
                return list;
            },
            ObjectsWithType: function (type) {
                var list = new (System.Collections.Generic.List$1(MyONez.Base.AdditionalStuff.TiledMap.Models.TiledObject)).ctor();
                for (var i = 0; i < this.Objects.Count; i = (i + 1) | 0) {
                    if (Bridge.referenceEquals(this.Objects.getItem(i).Type, type)) {
                        list.add(this.Objects.getItem(i));
                    }
                }
                return list;
            }
        }
    });

    Bridge.define("MyONez.Base.AdditionalStuff.TiledMap.Models.TiledRenderOrder", {
        $kind: "enum",
        statics: {
            fields: {
                RightDown: 0,
                RightUp: 1,
                LeftDown: 2,
                LeftUp: 3
            }
        }
    });

    Bridge.define("MyONez.Base.AdditionalStuff.TiledMap.Models.TiledTile", {
        fields: {
            Id: 0,
            FlippedHorizonally: false,
            FlippedVertically: false,
            FlippedDiagonally: false,
            OldId: 0,
            RenderTileSetTile: null,
            ElapsedTime: 0,
            CurrentFrame: 0
        },
        props: {
            TileSet: null,
            TileSetTile: null
        }
    });

    Bridge.define("MyONez.Base.AdditionalStuff.TiledMap.Models.TiledTileSet", {
        statics: {
            methods: {
                Build: function (imageWidth, imageHeight, tileWidth, tileHeight, spacing, margin, columns) {
                    var $t;
                    if (spacing === void 0) { spacing = 2; }
                    if (margin === void 0) { margin = 2; }
                    if (columns === void 0) { columns = 2; }
                    var tileSet = new MyONez.Base.AdditionalStuff.TiledMap.Models.TiledTileSet();
                    tileSet.Spacing = spacing;
                    tileSet.Margin = margin;

                    var id = 0;
                    for (var y = margin; y < ((imageHeight - margin) | 0); y = (y + (((tileHeight + spacing) | 0))) | 0) {
                        var column = 0;

                        for (var x = margin; x < ((imageWidth - margin) | 0); x = (x + (((tileWidth + spacing) | 0))) | 0) {
                            tileSet.Tiles.add(($t = new MyONez.Base.AdditionalStuff.TiledMap.Models.TiledTileSetTile(), $t.Id = id, $t.SourceRect = new Microsoft.Xna.Framework.Rectangle.$ctor2(x, y, tileWidth, tileHeight), $t));
                            id = (id + 1) | 0;

                            if (((column = (column + 1) | 0)) >= columns) {
                                break;
                            }
                        }
                    }

                    return tileSet;
                }
            }
        },
        fields: {
            Spacing: 0,
            Margin: 0,
            Properties: null,
            Tiles: null,
            FirstGid: 0,
            Image: null,
            ImageTexture: null
        },
        ctors: {
            init: function () {
                this.Properties = new (System.Collections.Generic.Dictionary$2(System.String,System.String))();
                this.Tiles = new (System.Collections.Generic.List$1(MyONez.Base.AdditionalStuff.TiledMap.Models.TiledTileSetTile)).ctor();
            }
        }
    });

    Bridge.define("MyONez.Base.AdditionalStuff.TiledMap.Models.TiledTileSetAnimationFrame", {
        fields: {
            TileId: 0,
            Duration: 0
        }
    });

    Bridge.define("MyONez.Base.AdditionalStuff.TiledMap.Models.TiledTileSetTile", {
        fields: {
            Id: 0,
            AnimationFrames: null,
            Properties: null,
            SourceRect: null
        },
        ctors: {
            init: function () {
                this.SourceRect = new Microsoft.Xna.Framework.Rectangle();
                this.Properties = new (System.Collections.Generic.Dictionary$2(System.String,System.String))();
            }
        }
    });

    Bridge.define("MyONez.Base.AdditionalStuff.TurnBase.Components.ApplyTurnComponent", {
        inherits: [LocomotorECS.Component],
        fields: {
            TurnsData: null,
            TurnApplied: false
        },
        ctors: {
            init: function () {
                this.TurnsData = new (System.Collections.Generic.List$1(MyONez.Base.AdditionalStuff.TurnBase.ITurnData)).ctor();
                this.TurnApplied = true;
            }
        }
    });

    Bridge.define("MyONez.Base.AdditionalStuff.TurnBase.Components.PlayerSwitcherComponent", {
        inherits: [LocomotorECS.Component],
        fields: {
            Players: null,
            SwitchType: 0,
            CurrentPlayer: 0,
            WaitingForTurnApply: false
        },
        ctors: {
            ctor: function (switchType, players) {
                if (players === void 0) { players = []; }

                this.$initialize();
                LocomotorECS.Component.ctor.call(this);
                this.SwitchType = switchType;
                this.Players = players;

                this.Players[System.Array.index(0, this.Players)].TurnMade = false;
                for (var i = 1; i < this.Players.length; i = (i + 1) | 0) {
                    this.Players[System.Array.index(i, this.Players)].TurnMade = this.SwitchType === MyONez.Base.AdditionalStuff.TurnBase.Components.PlayerSwitcherComponent.PlayerSwitchType.OneByOne;
                }
            }
        }
    });

    Bridge.define("MyONez.Base.AdditionalStuff.TurnBase.Components.PlayerSwitcherComponent.PlayerSwitchType", {
        $kind: "nested enum",
        statics: {
            fields: {
                /**
                 * Next turn made become available after previous turn applied
                 *
                 * @static
                 * @public
                 * @memberof number
                 * @constant
                 * @default 0
                 * @type number
                 */
                OneByOne: 0,
                /**
                 * Next turn for all players become available when last player turn was applied
                 *
                 * @static
                 * @public
                 * @memberof number
                 * @constant
                 * @default 1
                 * @type number
                 */
                AllAtOnce: 1
            }
        }
    });

    Bridge.define("MyONez.Base.AdditionalStuff.TurnBase.Components.PlayerTurnComponent", {
        inherits: [LocomotorECS.Component],
        fields: {
            TurnData: null,
            TurnMade: false
        }
    });

    Bridge.define("MyONez.Base.AdditionalStuff.TurnBase.EntitySystems.TurnSelectorUpdateSystem", {
        inherits: [LocomotorECS.EntityProcessingSystem],
        ctors: {
            ctor: function () {
                this.$initialize();
                LocomotorECS.EntityProcessingSystem.ctor.call(this, new LocomotorECS.Matching.Matcher().All([MyONez.Base.AdditionalStuff.TurnBase.Components.ApplyTurnComponent, MyONez.Base.AdditionalStuff.TurnBase.Components.PlayerSwitcherComponent]));
            }
        },
        methods: {
            DoAction$1: function (entity, gameTime) {
                LocomotorECS.EntityProcessingSystem.prototype.DoAction$1.call(this, entity, gameTime);

                var applyTurn = entity.GetComponent(MyONez.Base.AdditionalStuff.TurnBase.Components.ApplyTurnComponent);
                if (!applyTurn.TurnApplied) {
                    // Previously selected turn was not applied to game state by game specified logic.
                    return;
                }

                var switcher = entity.GetComponent(MyONez.Base.AdditionalStuff.TurnBase.Components.PlayerSwitcherComponent);
                if (switcher.WaitingForTurnApply) {
                    switcher.WaitingForTurnApply = false;
                    applyTurn.TurnsData.clear();

                    switch (switcher.SwitchType) {
                        case MyONez.Base.AdditionalStuff.TurnBase.Components.PlayerSwitcherComponent.PlayerSwitchType.OneByOne: 
                            switcher.Players[System.Array.index(switcher.CurrentPlayer, switcher.Players)].TurnMade = false;
                            break;
                        case MyONez.Base.AdditionalStuff.TurnBase.Components.PlayerSwitcherComponent.PlayerSwitchType.AllAtOnce: 
                            for (var i = 0; i < switcher.Players.length; i = (i + 1) | 0) {
                                switcher.Players[System.Array.index(i, switcher.Players)].TurnMade = false;
                            }
                            break;
                    }
                }

                var playerTurn = switcher.Players[System.Array.index(switcher.CurrentPlayer, switcher.Players)];
                if (!playerTurn.TurnMade) {
                    return;
                }

                switch (switcher.SwitchType) {
                    case MyONez.Base.AdditionalStuff.TurnBase.Components.PlayerSwitcherComponent.PlayerSwitchType.OneByOne: 
                        applyTurn.TurnApplied = false;
                        switcher.WaitingForTurnApply = true;
                        break;
                    case MyONez.Base.AdditionalStuff.TurnBase.Components.PlayerSwitcherComponent.PlayerSwitchType.AllAtOnce: 
                        if (switcher.CurrentPlayer === ((switcher.Players.length - 1) | 0)) {
                            applyTurn.TurnApplied = false;
                            switcher.WaitingForTurnApply = true;
                        }
                        break;
                }

                applyTurn.TurnsData.add(playerTurn.TurnData);
                switcher.CurrentPlayer = (((switcher.CurrentPlayer + 1) | 0)) % switcher.Players.length;
            }
        }
    });

    Bridge.define("MyONez.Base.AdditionalStuff.TurnBase.ITurnData", {
        $kind: "interface"
    });

    Bridge.define("MyONez.Base.ContentPaths", {
        statics: {
            fields: {
                content: null
            },
            ctors: {
                init: function () {
                    this.content = "Content";
                }
            }
        }
    });

    Bridge.define("MyONez.Base.ContentPaths.AnimatedTiles", {
        $kind: "nested class",
        statics: {
            fields: {
                desertpalacelamp: null,
                desertpalacetiles: null,
                desertpalace: null
            },
            ctors: {
                init: function () {
                    this.desertpalacelamp = "AnimatedTiles/desert-palace-lamp";
                    this.desertpalacetiles = "AnimatedTiles/desert-palace-tiles";
                    this.desertpalace = "AnimatedTiles/desert-palace";
                }
            }
        }
    });

    Bridge.define("MyONez.Base.ContentPaths.Basic", {
        $kind: "nested class",
        statics: {
            fields: {
                moon: null
            },
            ctors: {
                init: function () {
                    this.moon = "Basic/moon";
                }
            }
        }
    });

    Bridge.define("MyONez.Base.ContentPaths.Effects", {
        $kind: "nested class",
        statics: {
            fields: {
                bevels: null,
                bloomCombine: null,
                bloomExtract: null,
                crosshatch: null,
                deferredLighting: null,
                deferredSprite: null,
                dissolve: null,
                dots: null,
                forwardLighting: null,
                gaussianBlur: null,
                grayscale: null,
                heatDistortion: null,
                invert: null,
                letterbox: null,
                multiTexture: null,
                multiTextureOverlay: null,
                noise: null,
                paletteCycler: null,
                pixelGlitch: null,
                polygonLight: null,
                reflection: null,
                scanlines: null,
                sepia: null,
                spriteAlphaTest: null,
                spriteBlinkEffect: null,
                spriteLightMultiply: null,
                spriteLines: null,
                squares: null,
                textureWipe: null,
                twist: null,
                vignette: null,
                wind: null
            },
            ctors: {
                init: function () {
                    this.bevels = "effects/Bevels";
                    this.bloomCombine = "effects/BloomCombine";
                    this.bloomExtract = "effects/BloomExtract";
                    this.crosshatch = "effects/Crosshatch";
                    this.deferredLighting = "effects/DeferredLighting";
                    this.deferredSprite = "effects/DeferredSprite";
                    this.dissolve = "effects/Dissolve";
                    this.dots = "effects/Dots";
                    this.forwardLighting = "effects/ForwardLighting";
                    this.gaussianBlur = "effects/GaussianBlur";
                    this.grayscale = "effects/Grayscale";
                    this.heatDistortion = "effects/HeatDistortion";
                    this.invert = "effects/Invert";
                    this.letterbox = "effects/Letterbox";
                    this.multiTexture = "effects/MultiTexture";
                    this.multiTextureOverlay = "effects/MultiTextureOverlay";
                    this.noise = "effects/Noise";
                    this.paletteCycler = "effects/PaletteCycler";
                    this.pixelGlitch = "effects/PixelGlitch";
                    this.polygonLight = "effects/PolygonLight";
                    this.reflection = "effects/Reflection";
                    this.scanlines = "effects/Scanlines";
                    this.sepia = "effects/Sepia";
                    this.spriteAlphaTest = "effects/SpriteAlphaTest";
                    this.spriteBlinkEffect = "effects/SpriteBlinkEffect";
                    this.spriteLightMultiply = "effects/SpriteLightMultiply";
                    this.spriteLines = "effects/SpriteLines";
                    this.squares = "effects/Squares";
                    this.textureWipe = "effects/TextureWipe";
                    this.twist = "effects/Twist";
                    this.vignette = "effects/Vignette";
                    this.wind = "effects/Wind";
                }
            }
        }
    });

    Bridge.define("MyONez.Base.ContentPaths.SpriteLights", {
        $kind: "nested class",
        statics: {
            fields: {
                bg: null,
                moon: null,
                pixelspritelight: null,
                spritelight: null,
                tubelight: null
            },
            ctors: {
                init: function () {
                    this.bg = "SpriteLights/bg";
                    this.moon = "SpriteLights/moon";
                    this.pixelspritelight = "SpriteLights/pixel-sprite-light";
                    this.spritelight = "SpriteLights/sprite-light";
                    this.tubelight = "SpriteLights/tube-light";
                }
            }
        }
    });

    Bridge.define("MyONez.Base.ContentPaths.Textures", {
        $kind: "nested class",
        statics: {
            fields: {
                heatDistortionNoise: null
            },
            ctors: {
                init: function () {
                    this.heatDistortionNoise = "textures/heatDistortionNoise";
                }
            }
        }
    });

    Bridge.define("MyONez.Base.ContentPaths.Textures.TextureWipeTransition", {
        $kind: "nested class",
        statics: {
            fields: {
                angular: null,
                crissCross: null,
                diagonalDistort: null,
                horizontal: null,
                noise: null,
                pokemon: null,
                sawTooth: null,
                spiral: null,
                wink: null
            },
            ctors: {
                init: function () {
                    this.angular = "textures/textureWipeTransition/angular";
                    this.crissCross = "textures/textureWipeTransition/crissCross";
                    this.diagonalDistort = "textures/textureWipeTransition/diagonalDistort";
                    this.horizontal = "textures/textureWipeTransition/horizontal";
                    this.noise = "textures/textureWipeTransition/noise";
                    this.pokemon = "textures/textureWipeTransition/pokemon";
                    this.sawTooth = "textures/textureWipeTransition/sawTooth";
                    this.spiral = "textures/textureWipeTransition/spiral";
                    this.wink = "textures/textureWipeTransition/wink";
                }
            }
        }
    });

    /** @namespace MyONez.Base */

    /**
     * This is the main type for your game.
     *
     * @public
     * @class MyONez.Base.Game1
     * @augments SpineEngine.Core
     */
    Bridge.define("MyONez.Base.Game1", {
        inherits: [SpineEngine.Core],
        ctors: {
            ctor: function () {
                this.$initialize();
                SpineEngine.Core.ctor.call(this, 650, 800);
                this.Window.AllowUserResizing = true;
                this.IsMouseVisible = false;
            }
        },
        methods: {
            Initialize: function () {
                SpineEngine.Core.prototype.Initialize.call(this);
                SpineEngine.Core.Instance.SwitchScene(new (MyONez.Base.AdditionalStuff.Scenes.LoadingScene$1(MyONez.Base.Screens.BasicScene))(Bridge.fn.bind(this, $asm.$.MyONez.Base.Game1.f1)(new (System.Collections.Generic.List$1(MyONez.Base.AdditionalStuff.Scenes.LoadingData)).ctor()), 1200, 600));
            }
        }
    });

    Bridge.ns("MyONez.Base.Game1", $asm.$);

    Bridge.apply($asm.$.MyONez.Base.Game1, {
        f1: function (_o1) {
            var $t;
            _o1.add(($t = new MyONez.Base.AdditionalStuff.Scenes.LoadingData(), $t.Count = 47, $t.Enumerator = MyONez.Base.AdditionalStuff.FaceUI.Utils.GeonBitUIResources.GetEnumerator(this.Content, "hd"), $t));
            return _o1;
        }
    });

    Bridge.define("MyONez.Base.Screens.BaseScene", {
        inherits: [SpineEngine.ECS.Scene],
        statics: {
            fields: {
                ScreenSpaceRenderLayer: 0
            },
            ctors: {
                init: function () {
                    this.ScreenSpaceRenderLayer = 100;
                }
            }
        },
        ctors: {
            ctor: function () {
                var $t;
                this.$initialize();
                SpineEngine.ECS.Scene.ctor.call(this);
                this.AddEntitySystem(new MyONez.Base.AdditionalStuff.FaceUI.ECS.EntitySystems.UIUpdateSystem(SpineEngine.Core.Instance.Content));
                this.AddRenderer(SpineEngine.Graphics.Renderers.RenderLayerRenderer, ($t = new SpineEngine.Graphics.Renderers.RenderLayerRenderer([MyONez.Base.Screens.BaseScene.ScreenSpaceRenderLayer]), $t.RenderAfterPostProcessors = true, $t));
                var entity = this.CreateEntity("basic-ui");
                entity.AddComponent(SpineEngine.ECS.Components.RenderLayerComponent).Layer = MyONez.Base.Screens.BaseScene.ScreenSpaceRenderLayer;
                entity.AddComponent(SpineEngine.ECS.Components.ScaleComponent).Scale = Microsoft.Xna.Framework.Vector2.op_Multiply$1(Microsoft.Xna.Framework.Vector2.One.$clone(), 0.7);
                var ui = entity.AddComponent(MyONez.Base.AdditionalStuff.FaceUI.ECS.Components.UIComponent).UserInterface;
                var panel = new FaceUI.Entities.Panel.$ctor1(new Microsoft.Xna.Framework.Vector2.$ctor2(300, 1000), 0, FaceUI.Entities.Anchor.CenterRight, void 0);
                ui.AddEntity(panel);
                FaceUI.UserInterface.TimeToShowTooltipText = 0.5;
                // find every Scene with the SampleSceneAttribute and create a button for each one
                $t = Bridge.getEnumerator(this.GetTypesWithSampleSceneAttribute(), System.Tuple$2(Function,MyONez.Base.Utils.SampleSceneAttribute));
                try {
                    while ($t.moveNext()) {
                        var type = { v : $t.Current };
                        var sampleAttr = type.v.Item2;
                        var button = new FaceUI.Entities.Button.$ctor1(sampleAttr.buttonName);
                        panel.AddChild(button);
                        button.OnClick = Bridge.fn.combine(button.OnClick, (function ($me, type) {
                            return function (butt) {
                                var $t1;
                                // stop all tweens in case any demo scene started some up
                                SpineEngine.Core.Instance.GetGlobalManager(SpineEngine.GlobalManagers.Tweens.TweenGlobalManager).StopAllTweens();
                                SpineEngine.Core.Instance.SwitchScene$2(($t1 = new MyONez.Base.AdditionalStuff.SceneTransitions.FadeTransition(), $t1.SceneLoadAction = function () {
                                    return Bridge.as(Bridge.createInstance(type.v.Item1), SpineEngine.ECS.Scene);
                                }, $t1));
                            };
                        })(this, type));

                        // optionally add instruction text for the current scene
                        if (sampleAttr.instructionText != null) {
                            button.ToolTipText = sampleAttr.instructionText;
                        }
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }


                // add exit button
                var exitBtn = new FaceUI.Entities.Button.$ctor1("Exit", 0, FaceUI.Entities.Anchor.BottomCenter, void 0, void 0);
                exitBtn.OnClick = $asm.$.MyONez.Base.Screens.BaseScene.f1;
                panel.AddChild(exitBtn);
            }
        },
        methods: {
            GetTypesWithSampleSceneAttribute: function () {
                return new (Bridge.GeneratorEnumerable$1(System.Tuple$2(Function,MyONez.Base.Utils.SampleSceneAttribute)))(Bridge.fn.bind(this, function ()  {
                    var $step = 0,
                        $jumpFromFinally,
                        $returnValue,
                        assembly,
                        scenes,
                        $t,
                        s,
                        $async_e;

                    var $enumerator = new (Bridge.GeneratorEnumerator$1(System.Tuple$2(Function,MyONez.Base.Utils.SampleSceneAttribute)))(Bridge.fn.bind(this, function () {
                        try {
                            for (;;) {
                                switch ($step) {
                                    case 0: {
                                        assembly = Bridge.Reflection.getTypeAssembly(MyONez.Base.Utils.SampleSceneAttribute);
                                            scenes = System.Linq.Enumerable.from(Bridge.Reflection.getAssemblyTypes(assembly)).select($asm.$.MyONez.Base.Screens.BaseScene.f2).where($asm.$.MyONez.Base.Screens.BaseScene.f3).orderBy($asm.$.MyONez.Base.Screens.BaseScene.f4);

                                            $t = Bridge.getEnumerator(scenes);
                                            $step = 1;
                                            continue;
                                    }
                                    case 1: {
                                        if ($t.moveNext()) {
                                                s = $t.Current;
                                                $step = 2;
                                                continue;
                                            }
                                        $step = 4;
                                        continue;
                                    }
                                    case 2: {
                                        $enumerator.current = s;
                                            $step = 3;
                                            return true;
                                    }
                                    case 3: {
                                        $step = 1;
                                        continue;
                                    }
                                    case 4: {

                                    }
                                    default: {
                                        return false;
                                    }
                                }
                            }
                        } catch($async_e1) {
                            $async_e = System.Exception.create($async_e1);
                            throw $async_e;
                        }
                    }));
                    return $enumerator;
                }));
            }
        }
    });

    Bridge.ns("MyONez.Base.Screens.BaseScene", $asm.$);

    Bridge.apply($asm.$.MyONez.Base.Screens.BaseScene, {
        f1: function (butt) {
            SpineEngine.Core.Instance.Exit();
        },
        f2: function (t) {
            return { Item1: t, Item2: Bridge.cast(System.Linq.Enumerable.from(Bridge.Reflection.getAttributes(t, MyONez.Base.Utils.SampleSceneAttribute, true)).firstOrDefault(null, null), MyONez.Base.Utils.SampleSceneAttribute) };
        },
        f3: function (t) {
            return t.Item2 != null;
        },
        f4: function (t) {
            return Bridge.Reflection.getTypeName(t.Item1);
        }
    });

    Bridge.define("MyONez.Base.Screens.MapComponent", {
        inherits: [LocomotorECS.Component],
        fields: {
            Map: null
        },
        props: {
            Texture: null
        },
        ctors: {
            init: function () {
                this.Map = new BrainAI.Pathfinding.AStar.AstarGridGraph(100, 100);
            }
        }
    });

    Bridge.define("MyONez.Base.Screens.ArrowComponent", {
        inherits: [LocomotorECS.Component]
    });

    Bridge.define("MyONez.Base.Screens.MapGeneratorSystem", {
        inherits: [LocomotorECS.EntityProcessingSystem],
        ctors: {
            ctor: function () {
                this.$initialize();
                LocomotorECS.EntityProcessingSystem.ctor.call(this, new LocomotorECS.Matching.Matcher().All([MyONez.Base.Screens.MapComponent]));
            }
        },
        methods: {
            DoAction$1: function (entity, gameTime) {
                LocomotorECS.EntityProcessingSystem.prototype.DoAction$1.call(this, entity, gameTime);
                var map = entity.GetComponent(MyONez.Base.Screens.MapComponent);
                var finalRender = entity.GetOrCreateComponent(SpineEngine.ECS.Components.FinalRenderComponent);

                finalRender.Batch.Clear();

                var texture = map.Texture || SpineEngine.Graphics.Graphic.PixelTexture;
                var subtextureWidth = texture.Width / map.Map.Width;
                var subtextureHeight = texture.Height / map.Map.Height;

                for (var x = 0; x < map.Map.Width; x = (x + 1) | 0) {
                    for (var y = 0; y < map.Map.Height; y = (y + 1) | 0) {
                        var block = map.Map.Walls.contains(new BrainAI.Pathfinding.Point.$ctor1(x, y));
                        if (!block) {
                            continue;
                        }

                        finalRender.Batch.Draw(texture, new SpineEngine.Maths.RectangleF.$ctor2(x - 0.5, y - 0.5, 1, 1), new SpineEngine.Maths.RectangleF.$ctor2(subtextureWidth * x, subtextureHeight * y, subtextureWidth, subtextureHeight), Microsoft.Xna.Framework.Color.White.$clone());
                    }
                }
            }
        }
    });

    Bridge.define("MyONez.Base.Screens.SnakeArrowUpdateSystem", {
        inherits: [LocomotorECS.EntityProcessingSystem],
        fields: {
            food: null
        },
        ctors: {
            ctor: function (food) {
                this.$initialize();
                LocomotorECS.EntityProcessingSystem.ctor.call(this, new LocomotorECS.Matching.Matcher().All([MyONez.Base.Screens.ArrowComponent]));
                this.food = food;
            }
        },
        methods: {
            DoAction$1: function (entity, gameTime) {
                LocomotorECS.EntityProcessingSystem.prototype.DoAction$1.call(this, entity, gameTime);
                var arrow = entity.GetComponent(SpineEngine.ECS.Components.RotateComponent);
                var snake = entity.GetComponent(SpineEngine.ECS.Components.ParentComponent).Parent;
                var snakePosition = SpineEngine.Maths.TransformationUtils.GetTransformation(snake);
                var foodPosition = SpineEngine.Maths.TransformationUtils.GetTransformation(this.food);

                var angleToFood = SpineEngine.Maths.Mathf.Atan2(1 - (foodPosition.Position.Y - snakePosition.Position.Y), 0 - (foodPosition.Position.X - snakePosition.Position.X));

                arrow.Rotation = angleToFood - snakePosition.Rotate;
            }
        }
    });

    Bridge.define("MyONez.Base.Screens.SnakeComponent", {
        inherits: [LocomotorECS.Component],
        fields: {
            Direction: null
        },
        ctors: {
            init: function () {
                this.Direction = new Microsoft.Xna.Framework.Vector2();
                this.Direction = new Microsoft.Xna.Framework.Vector2.$ctor2(0, 1);
            }
        }
    });

    Bridge.define("MyONez.Base.Screens.SnakeControlSystem", {
        inherits: [LocomotorECS.EntityProcessingSystem],
        ctors: {
            ctor: function () {
                this.$initialize();
                LocomotorECS.EntityProcessingSystem.ctor.call(this, new LocomotorECS.Matching.Matcher().All([MyONez.Base.Screens.SnakeComponent, SpineEngine.ECS.Components.InputVirtualComponent]));
            }
        },
        methods: {
            DoAction$1: function (entity, gameTime) {
                LocomotorECS.EntityProcessingSystem.prototype.DoAction$1.call(this, entity, gameTime);
                var input = entity.GetOrCreateComponent(SpineEngine.ECS.Components.InputVirtualComponent);
                var snake = entity.GetOrCreateComponent(MyONez.Base.Screens.SnakeComponent);
                var joystick = Bridge.cast(input.InputConfiguration.getItem(0), SpineEngine.ECS.EntitySystems.VirtualInput.VirtualJoystick).Value.$clone();

                snake.Direction = joystick.$clone();
            }
        }
    });

    Bridge.define("MyONez.Base.Screens.SnakeFoodUpdateSystem", {
        inherits: [LocomotorECS.EntityProcessingSystem],
        fields: {
            scene: null,
            food: null,
            map: null
        },
        ctors: {
            ctor: function (scene, food, map) {
                this.$initialize();
                LocomotorECS.EntityProcessingSystem.ctor.call(this, new LocomotorECS.Matching.Matcher().All([MyONez.Base.Screens.SnakeComponent, SpineEngine.ECS.Components.PositionComponent]));
                this.scene = scene;
                this.food = food;
                this.map = map;
            }
        },
        methods: {
            DoAction$1: function (entity, gameTime) {
                var $t;
                LocomotorECS.EntityProcessingSystem.prototype.DoAction$1.call(this, entity, gameTime);
                var snakePosition = entity.GetComponent(SpineEngine.ECS.Components.PositionComponent);
                var foodPosition = this.food.GetComponent(SpineEngine.ECS.Components.PositionComponent);

                if (Microsoft.Xna.Framework.Vector2.op_Equality(snakePosition.Position.$clone(), foodPosition.Position.$clone())) {
                    $t = this.scene.Camera;
                    $t.RawZoom -= 0.1;
                    this.scene.ReLocateFood(this.map, this.food);
                    for (var i = 0; i < 50; i = (i + 1) | 0) {
                        this.scene.AddWall(this.map);
                    }
                }
            }
        }
    });

    Bridge.define("MyONez.Base.Screens.SnakeGameOverSystem", {
        inherits: [LocomotorECS.EntityProcessingSystem],
        fields: {
            map: null
        },
        ctors: {
            ctor: function (map) {
                this.$initialize();
                LocomotorECS.EntityProcessingSystem.ctor.call(this, new LocomotorECS.Matching.Matcher().All([MyONez.Base.Screens.SnakeComponent, SpineEngine.ECS.Components.PositionComponent]));
                this.map = map;
            }
        },
        methods: {
            DoAction$1: function (entity, gameTime) {
                var $t;
                LocomotorECS.EntityProcessingSystem.prototype.DoAction$1.call(this, entity, gameTime);
                var position = entity.GetOrCreateComponent(SpineEngine.ECS.Components.PositionComponent);

                if (this.map.Map.Walls.contains(new BrainAI.Pathfinding.Point.$ctor1(Bridge.Int.clip32(position.Position.X), Bridge.Int.clip32(position.Position.Y)))) {
                    SpineEngine.Core.Instance.SwitchScene$2(($t = new MyONez.Base.AdditionalStuff.SceneTransitions.FadeTransition(), $t.SceneLoadAction = $asm.$.MyONez.Base.Screens.SnakeGameOverSystem.f1, $t));
                    entity.RemoveComponent$1(MyONez.Base.Screens.SnakeComponent);
                }
            }
        }
    });

    Bridge.ns("MyONez.Base.Screens.SnakeGameOverSystem", $asm.$);

    Bridge.apply($asm.$.MyONez.Base.Screens.SnakeGameOverSystem, {
        f1: function () {
            return new MyONez.Base.Screens.BasicScene();
        }
    });

    Bridge.define("MyONez.Base.Screens.SnakeMoveSystem", {
        inherits: [LocomotorECS.EntityProcessingSystem],
        statics: {
            fields: {
                Speed: 0
            },
            ctors: {
                init: function () {
                    this.Speed = 100;
                }
            }
        },
        fields: {
            elapsed: null,
            elapsedSeconds: 0
        },
        ctors: {
            init: function () {
                this.elapsed = new System.TimeSpan();
                this.elapsed = System.TimeSpan.zero;
            },
            ctor: function () {
                this.$initialize();
                LocomotorECS.EntityProcessingSystem.ctor.call(this, new LocomotorECS.Matching.Matcher().All([MyONez.Base.Screens.SnakeComponent, SpineEngine.ECS.Components.PositionComponent]));
            }
        },
        methods: {
            DoAction$1: function (entity, gameTime) {
                LocomotorECS.EntityProcessingSystem.prototype.DoAction$1.call(this, entity, gameTime);
                var snake = entity.GetOrCreateComponent(MyONez.Base.Screens.SnakeComponent);
                var position = entity.GetOrCreateComponent(SpineEngine.ECS.Components.PositionComponent);

                this.elapsed = System.TimeSpan.add(this.elapsed, gameTime);

                if (Bridge.Int.clip32((this.elapsed.getTotalSeconds() * MyONez.Base.Screens.SnakeMoveSystem.Speed)) > this.elapsedSeconds) {
                    this.elapsedSeconds = Bridge.Int.clip32(this.elapsed.getTotalSeconds() * MyONez.Base.Screens.SnakeMoveSystem.Speed);
                    position.Position = Microsoft.Xna.Framework.Vector2.op_Addition(position.Position.$clone(), snake.Direction.$clone());
                }
            }
        }
    });

    Bridge.define("MyONez.Base.Utils.SampleSceneAttribute", {
        inherits: [System.Attribute],
        fields: {
            buttonName: null,
            instructionText: null
        },
        ctors: {
            ctor: function (buttonName, instructionText) {
                this.$initialize();
                System.Attribute.ctor.call(this);
                this.buttonName = buttonName;
                this.instructionText = instructionText;
            }
        }
    });

    Bridge.define("PixelRPG.Base.Screens.ClientComponent", {
        inherits: [LocomotorECS.Component],
        fields: {
            Message: null,
            Response: null
        }
    });

    Bridge.define("PixelRPG.Base.Screens.ClientReceiveHandlerSystem$1", function (T) { return {
        inherits: [LocomotorECS.EntityProcessingSystem],
        ctors: {
            ctor: function (matcher) {
                this.$initialize();
                LocomotorECS.EntityProcessingSystem.ctor.call(this, matcher.All([PixelRPG.Base.Screens.ClientComponent]));
            }
        },
        methods: {
            DoAction$1: function (entity, gameTime) {
                LocomotorECS.EntityProcessingSystem.prototype.DoAction$1.call(this, entity, gameTime);

                var client = entity.GetComponent(PixelRPG.Base.Screens.ClientComponent);
                if (client.Response == null || !Bridge.referenceEquals(Bridge.getType(client.Response), T)) {
                    return;
                }

                var message = Bridge.cast(Bridge.unbox(client.Response, T), T);
                this.DoAction$2(message, entity, gameTime);
            }
        }
    }; });

    Bridge.define("PixelRPG.Base.Screens.ClientSendHandlerSystem$1", function (T) { return {
        inherits: [LocomotorECS.EntityProcessingSystem],
        ctors: {
            ctor: function (matcher) {
                this.$initialize();
                LocomotorECS.EntityProcessingSystem.ctor.call(this, matcher.All([PixelRPG.Base.Screens.ClientComponent]));
            }
        },
        methods: {
            DoAction$1: function (entity, gameTime) {
                LocomotorECS.EntityProcessingSystem.prototype.DoAction$1.call(this, entity, gameTime);
                var client = entity.GetComponent(PixelRPG.Base.Screens.ClientComponent);

                var data = this.PrepareSendData(entity, gameTime);

                if (data != null) {
                    client.Message = data;
                }
            }
        }
    }; });

    Bridge.define("PixelRPG.Base.Screens.LocalClientCommunicatorSystem", {
        inherits: [LocomotorECS.EntityProcessingSystem],
        fields: {
            scene: null,
            parsers: null
        },
        ctors: {
            ctor: function (scene, parsers) {
                if (parsers === void 0) { parsers = []; }

                this.$initialize();
                LocomotorECS.EntityProcessingSystem.ctor.call(this, new LocomotorECS.Matching.Matcher().All([PixelRPG.Base.Screens.LocalClientComponent, PixelRPG.Base.Screens.ClientComponent]));
                this.scene = scene;
                this.parsers = parsers;
            }
        },
        methods: {
            DoAction$1: function (entity, gameTime) {
                LocomotorECS.EntityProcessingSystem.prototype.DoAction$1.call(this, entity, gameTime);
                var localClient = entity.GetComponent(PixelRPG.Base.Screens.LocalClientComponent);
                var client = entity.GetComponent(PixelRPG.Base.Screens.ClientComponent);
                var serverEntity = this.scene.FindEntity(localClient.ServerEntity);
                var localServer = serverEntity.GetComponent(PixelRPG.Base.Screens.LocalServerComponent);

                if (System.Guid.op_Equality(localClient.Identifier, System.Guid.Empty)) {
                    localClient.Identifier = System.Guid.NewGuid();
                    localServer.PendingConnections.add(localClient.Identifier);
                    return;
                }

                if (client.Message != null) {
                    localServer.Request.get(localClient.Identifier).add(client.Message);
                    //System.Diagnostics.Debug.WriteLine($"Local Client -> {localClient.Identifier} {ParserUtils.FindStringifier(client.Message, parsers).ToData(client.Message)}");
                    client.Message = null;
                }

                var response = localServer.Response.get(localClient.Identifier);
                client.Response = null;
                if (response.Count !== 0) {
                    client.Response = response.getItem(0);
                    localServer.Response.get(localClient.Identifier).removeAt(0);
                    //System.Diagnostics.Debug.WriteLine($"Local Client <- {localClient.Identifier} {ParserUtils.FindStringifier(client.Response, parsers).ToData(client.Response)}");
                }
            }
        }
    });

    Bridge.define("PixelRPG.Base.Screens.LocalClientComponent", {
        inherits: [LocomotorECS.Component],
        fields: {
            ServerEntity: null,
            Identifier: null
        },
        ctors: {
            init: function () {
                this.Identifier = new System.Guid();
                this.Identifier = System.Guid.Empty;
            }
        }
    });

    Bridge.define("PixelRPG.Base.Screens.LocalServerCommunicatorSystem", {
        inherits: [LocomotorECS.EntityProcessingSystem],
        ctors: {
            ctor: function () {
                this.$initialize();
                LocomotorECS.EntityProcessingSystem.ctor.call(this, new LocomotorECS.Matching.Matcher().All([PixelRPG.Base.Screens.LocalServerComponent, PixelRPG.Base.Screens.ServerComponent]));
            }
        },
        methods: {
            DoAction$1: function (entity, gameTime) {
                LocomotorECS.EntityProcessingSystem.prototype.DoAction$1.call(this, entity, gameTime);
                var localServer = entity.GetComponent(PixelRPG.Base.Screens.LocalServerComponent);
                var server = entity.GetComponent(PixelRPG.Base.Screens.ServerComponent);

                if (localServer.PendingConnections.Count > 0) {
                    for (var i = 0; i < localServer.PendingConnections.Count; i = (i + 1) | 0) {
                        server.ConnectedPlayers = (server.ConnectedPlayers + 1) | 0;
                        var tcpClient = localServer.PendingConnections.getItem(i);
                        localServer.Clients.add(tcpClient);
                        localServer.PlayerIdToClient.set(server.ConnectedPlayers, tcpClient);
                        localServer.ClientToPlayerId.set(tcpClient, server.ConnectedPlayers);
                        server.Request.set(localServer.ClientToPlayerId.get(tcpClient), new (System.Collections.Generic.List$1(System.Object)).ctor());
                        server.Response.set(localServer.ClientToPlayerId.get(tcpClient), new (System.Collections.Generic.List$1(System.Object)).ctor());
                        localServer.Request.set(tcpClient, new (System.Collections.Generic.List$1(System.Object)).ctor());
                        localServer.Response.set(tcpClient, new (System.Collections.Generic.List$1(System.Object)).ctor());
                    }
                    localServer.PendingConnections.clear();
                }

                for (var i1 = 0; i1 < localServer.Clients.Count; i1 = (i1 + 1) | 0) {
                    var client = localServer.Clients.getItem(i1);
                    var id = localServer.ClientToPlayerId.get(client);
                    if (localServer.Request.containsKey(client) && localServer.Request.get(client).Count > 0) {
                        var data = localServer.Request.get(client);
                        server.Request.get(id).AddRange(data);
                        //System.Diagnostics.Debug.WriteLine($"Local Server <- {client} ({id}) {data.Count} items");
                        data.clear();
                    }

                    if (server.Response.containsKey(id) && server.Response.get(id).Count > 0) {
                        var data1 = server.Response.get(id);
                        localServer.Response.get(client).AddRange(data1);
                        //System.Diagnostics.Debug.WriteLine($"Local Server -> {client} ({id}) {data.Count} items");
                        data1.clear();
                    }
                }
            }
        }
    });

    Bridge.define("PixelRPG.Base.Screens.LocalServerComponent", {
        inherits: [LocomotorECS.Component],
        fields: {
            Request: null,
            Response: null,
            PendingConnections: null,
            ClientToPlayerId: null,
            PlayerIdToClient: null,
            Clients: null
        },
        ctors: {
            init: function () {
                this.Request = new (System.Collections.Generic.Dictionary$2(System.Guid,System.Collections.Generic.List$1(System.Object)))();
                this.Response = new (System.Collections.Generic.Dictionary$2(System.Guid,System.Collections.Generic.List$1(System.Object)))();
                this.PendingConnections = new (System.Collections.Generic.List$1(System.Guid)).ctor();
                this.ClientToPlayerId = new (System.Collections.Generic.Dictionary$2(System.Guid,System.Int32))();
                this.PlayerIdToClient = new (System.Collections.Generic.Dictionary$2(System.Int32,System.Guid))();
                this.Clients = new (System.Collections.Generic.List$1(System.Guid)).ctor();
            }
        }
    });

    Bridge.define("PixelRPG.Base.Screens.NetworkClientCommunicatorSystem", {
        inherits: [LocomotorECS.EntityProcessingSystem],
        fields: {
            ms: null,
            reader: null,
            parsers: null
        },
        ctors: {
            ctor: function (parsers) {
                if (parsers === void 0) { parsers = []; }

                this.$initialize();
                LocomotorECS.EntityProcessingSystem.ctor.call(this, new LocomotorECS.Matching.Matcher().All([PixelRPG.Base.Screens.NetworkClientComponent, PixelRPG.Base.Screens.ClientComponent]));
                this.ms = new System.IO.MemoryStream.ctor();
                this.reader = new System.IO.StreamReader.$ctor3(this.ms, System.Text.Encoding.UTF8);
                this.parsers = parsers;
            }
        },
        methods: {
            DoAction$1: function (entity, gameTime) {
                LocomotorECS.EntityProcessingSystem.prototype.DoAction$1.call(this, entity, gameTime);
                var networkClient = entity.GetComponent(PixelRPG.Base.Screens.NetworkClientComponent);
                var client = entity.GetComponent(PixelRPG.Base.Screens.ClientComponent);

                if (networkClient.Client == null) {
                    networkClient.Client = new System.Net.WebSockets.ClientWebSocket();
                    networkClient.Client.connectAsync(networkClient.ServerAddress, System.Threading.CancellationToken.none);
                }

                if (networkClient.Client.getState() !== "open") {
                    return;
                }

                if (client.Message != null) {
                    var transferModel = client.Message;
                    var parser = MyONez.Base.AdditionalStuff.ClientServer.ParserUtils.FindStringifier(transferModel, this.parsers);
                    var data = parser.MyONez$Base$AdditionalStuff$ClientServer$ITransferMessageParser$ToData(transferModel);
                    networkClient.Client.sendAsync(new System.ArraySegment(System.Text.Encoding.UTF8.GetBytes$2(data)), "text", true, System.Threading.CancellationToken.none);
                    client.Message = null;
                    return;
                }

                if (networkClient.RecievingTask == null) {
                    networkClient.RecievingTask = networkClient.Client.receiveAsync(networkClient.RecievingBuffer, System.Threading.CancellationToken.none);
                }

                if (networkClient.RecievingTask.isCompleted()) {
                    var result = networkClient.RecievingTask.getResult();
                    networkClient.RecievingTask = null;
                    this.ms.Seek(System.Int64(0), 0);
                    this.ms.SetLength(System.Int64(0));
                    this.ms.Write(networkClient.RecievingBuffer.getArray(), networkClient.RecievingBuffer.getOffset(), result.getCount());

                    while (!result.getEndOfMessage()) {
                        result = networkClient.Client.receiveAsync(networkClient.RecievingBuffer, System.Threading.CancellationToken.none).getResult();
                        this.ms.Write(networkClient.RecievingBuffer.getArray(), networkClient.RecievingBuffer.getOffset(), result.getCount());
                    }
                    ;


                    this.ms.Seek(System.Int64(0), 0);
                    var data1 = this.reader.ReadToEnd();

                    var parser1 = MyONez.Base.AdditionalStuff.ClientServer.ParserUtils.FindParser(data1, this.parsers);
                    client.Response = parser1.MyONez$Base$AdditionalStuff$ClientServer$ITransferMessageParser$ToTransferModel(data1);
                }
            }
        }
    });

    Bridge.define("PixelRPG.Base.Screens.NetworkClientComponent", {
        inherits: [LocomotorECS.Component],
        fields: {
            Client: null,
            RecievingTask: null,
            RecievingBuffer: null
        },
        props: {
            ServerAddress: null
        },
        ctors: {
            init: function () {
                this.RecievingBuffer = new System.ArraySegment();
                this.RecievingBuffer = new System.ArraySegment(System.Array.init(2048, 0, System.Byte));
            },
            ctor: function (serverAddress) {
                this.$initialize();
                LocomotorECS.Component.ctor.call(this);
                this.ServerAddress = serverAddress;
            }
        }
    });

    Bridge.define("PixelRPG.Base.Screens.NetworkServerCommunicatorSystem", {
        inherits: [LocomotorECS.EntityProcessingSystem],
        statics: {
            methods: {
                GetDecodedData: function (buffer, length) {
                    var b = buffer[System.Array.index(1, buffer)];
                    var dataLength = 0;
                    var totalLength = 0;
                    var keyIndex = 0;

                    if (((b - 128) | 0) <= 125) {
                        dataLength = (b - 128) | 0;
                        keyIndex = 2;
                        totalLength = (dataLength + 6) | 0;
                    }

                    if (((b - 128) | 0) === 126) {
                        dataLength = System.BitConverter.toInt16(System.Array.init([buffer[System.Array.index(3, buffer)], buffer[System.Array.index(2, buffer)]], System.Byte), 0);
                        keyIndex = 4;
                        totalLength = (dataLength + 8) | 0;
                    }

                    if (((b - 128) | 0) === 127) {
                        dataLength = System.Int64.clip32(System.BitConverter.toInt64(System.Array.init([buffer[System.Array.index(9, buffer)], buffer[System.Array.index(8, buffer)], buffer[System.Array.index(7, buffer)], buffer[System.Array.index(6, buffer)], buffer[System.Array.index(5, buffer)], buffer[System.Array.index(4, buffer)], buffer[System.Array.index(3, buffer)], buffer[System.Array.index(2, buffer)]], System.Byte), 0));
                        keyIndex = 10;
                        totalLength = (dataLength + 14) | 0;
                    }

                    if (totalLength > length) {
                        throw new System.Exception("The buffer length is small than the data length");
                    }

                    var key = System.Array.init([buffer[System.Array.index(keyIndex, buffer)], buffer[System.Array.index(((keyIndex + 1) | 0), buffer)], buffer[System.Array.index(((keyIndex + 2) | 0), buffer)], buffer[System.Array.index(((keyIndex + 3) | 0), buffer)]], System.Byte);

                    var dataIndex = (keyIndex + 4) | 0;
                    var count = 0;
                    for (var i = dataIndex; i < totalLength; i = (i + 1) | 0) {
                        buffer[System.Array.index(i, buffer)] = (buffer[System.Array.index(i, buffer)] ^ key[System.Array.index(count % 4, key)]) & 255;
                        count = (count + 1) | 0;
                    }

                    var retBytes = System.Array.init(dataLength, 0, System.Byte);

                    System.Array.copy(buffer, dataIndex, retBytes, 0, dataLength);

                    return retBytes;
                },
                GetFrameFromBytes: function (bytesRaw) {
                    var response;
                    var frame = System.Array.init(10, 0, System.Byte);

                    var indexStartRawData = -1;
                    var length = bytesRaw.length;

                    frame[System.Array.index(0, frame)] = 129;
                    if (length <= 125) {
                        frame[System.Array.index(1, frame)] = length & 255;
                        indexStartRawData = 2;
                    } else if (length >= 126 && length <= 65535) {
                        frame[System.Array.index(1, frame)] = 126;
                        frame[System.Array.index(2, frame)] = ((length >> 8) & 255) & 255;
                        frame[System.Array.index(3, frame)] = (length & 255) & 255;
                        indexStartRawData = 4;
                    } else {
                        frame[System.Array.index(1, frame)] = 127;
                        frame[System.Array.index(2, frame)] = ((length >> 56) & 255) & 255;
                        frame[System.Array.index(3, frame)] = ((length >> 48) & 255) & 255;
                        frame[System.Array.index(4, frame)] = ((length >> 40) & 255) & 255;
                        frame[System.Array.index(5, frame)] = ((length >> 32) & 255) & 255;
                        frame[System.Array.index(6, frame)] = ((length >> 24) & 255) & 255;
                        frame[System.Array.index(7, frame)] = ((length >> 16) & 255) & 255;
                        frame[System.Array.index(8, frame)] = ((length >> 8) & 255) & 255;
                        frame[System.Array.index(9, frame)] = (length & 255) & 255;

                        indexStartRawData = 10;
                    }

                    response = System.Array.init(((indexStartRawData + length) | 0), 0, System.Byte);

                    var i, reponseIdx = 0;

                    //Add the frame bytes to the reponse
                    for (i = 0; i < indexStartRawData; i = (i + 1) | 0) {
                        response[System.Array.index(reponseIdx, response)] = frame[System.Array.index(i, frame)];
                        reponseIdx = (reponseIdx + 1) | 0;
                    }

                    //Add the data bytes to the response
                    for (i = 0; i < length; i = (i + 1) | 0) {
                        response[System.Array.index(reponseIdx, response)] = bytesRaw[System.Array.index(i, bytesRaw)];
                        reponseIdx = (reponseIdx + 1) | 0;
                    }

                    return response;
                }
            }
        },
        fields: {
            parsers: null
        },
        ctors: {
            ctor: function (parsers) {
                if (parsers === void 0) { parsers = []; }

                this.$initialize();
                LocomotorECS.EntityProcessingSystem.ctor.call(this, new LocomotorECS.Matching.Matcher().All([PixelRPG.Base.Screens.NetworkServerComponent, PixelRPG.Base.Screens.ServerComponent]));
                this.parsers = parsers;
            }
        },
        methods: {
            DoAction$1: function (entity, gameTime) {
                LocomotorECS.EntityProcessingSystem.prototype.DoAction$1.call(this, entity, gameTime);
            }
        }
    });

    Bridge.define("PixelRPG.Base.Screens.NetworkServerComponent", {
        inherits: [LocomotorECS.Component],
        props: {
            Ip: null,
            Port: 0
        },
        ctors: {
            ctor: function (ip, port) {
                this.$initialize();
                LocomotorECS.Component.ctor.call(this);
                this.Ip = ip;
                this.Port = port;
            }
        }
    });

    Bridge.define("PixelRPG.Base.Screens.ServerComponent", {
        inherits: [LocomotorECS.Component],
        fields: {
            ConnectedPlayers: 0,
            Request: null,
            Response: null
        },
        ctors: {
            init: function () {
                this.Request = new (System.Collections.Generic.Dictionary$2(System.Int32,System.Collections.Generic.List$1(System.Object)))();
                this.Response = new (System.Collections.Generic.Dictionary$2(System.Int32,System.Collections.Generic.List$1(System.Object)))();
            }
        }
    });

    Bridge.define("PixelRPG.Base.Screens.ServerReceiveHandlerSystem", {
        inherits: [LocomotorECS.EntityProcessingSystem],
        fields: {
            handlers: null
        },
        ctors: {
            ctor: function (handlers) {
                if (handlers === void 0) { handlers = []; }

                this.$initialize();
                LocomotorECS.EntityProcessingSystem.ctor.call(this, new LocomotorECS.Matching.Matcher().All([PixelRPG.Base.Screens.ServerComponent]));
                this.handlers = System.Linq.Enumerable.from(handlers).toDictionary($asm.$.PixelRPG.Base.Screens.ServerReceiveHandlerSystem.f1, null, Function, PixelRPG.Base.Screens.ServerReceiveHandlerSystem.IHandler);
            }
        },
        methods: {
            DoAction$1: function (entity, gameTime) {
                var $t;
                LocomotorECS.EntityProcessingSystem.prototype.DoAction$1.call(this, entity, gameTime);
                var server = entity.GetComponent(PixelRPG.Base.Screens.ServerComponent);
                $t = Bridge.getEnumerator(server.Request);
                try {
                    while ($t.moveNext()) {
                        var req = $t.Current;
                        if (!server.Response.containsKey(req.key)) {
                            server.Response.set(req.key, new (System.Collections.Generic.List$1(System.Object)).ctor());
                        }

                        for (var i = 0; i < req.value.Count; i = (i + 1) | 0) {
                            this.handlers.get(Bridge.getType(req.value.getItem(i))).PixelRPG$Base$Screens$ServerReceiveHandlerSystem$IHandler$Handle(server, req.key, req.value.getItem(i));
                        }

                        req.value.clear();
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }
            }
        }
    });

    Bridge.ns("PixelRPG.Base.Screens.ServerReceiveHandlerSystem", $asm.$);

    Bridge.apply($asm.$.PixelRPG.Base.Screens.ServerReceiveHandlerSystem, {
        f1: function (a) {
            return a.PixelRPG$Base$Screens$ServerReceiveHandlerSystem$IHandler$MessageType;
        }
    });

    Bridge.define("PixelRPG.Base.Screens.ServerReceiveHandlerSystem.IHandler", {
        $kind: "nested interface"
    });

    Bridge.define("MyONez.Base.AdditionalStuff.ClientServer.TransferMessageParser$1", function (T) { return {
        inherits: [MyONez.Base.AdditionalStuff.ClientServer.ITransferMessageParser],
        statics: {
            fields: {
                TypeName: null
            },
            ctors: {
                init: function () {
                    this.TypeName = Bridge.Reflection.getTypeName(T);
                }
            }
        },
        alias: [
            "IsParsable", "MyONez$Base$AdditionalStuff$ClientServer$ITransferMessageParser$IsParsable",
            "IsStringable", "MyONez$Base$AdditionalStuff$ClientServer$ITransferMessageParser$IsStringable",
            "ToData", "MyONez$Base$AdditionalStuff$ClientServer$ITransferMessageParser$ToData",
            "ToTransferModel", "MyONez$Base$AdditionalStuff$ClientServer$ITransferMessageParser$ToTransferModel"
        ],
        methods: {
            IsParsable: function (data) {
                return System.String.startsWith(data, System.String.format("{0}:", [MyONez.Base.AdditionalStuff.ClientServer.TransferMessageParser$1(T).TypeName]));
            },
            IsStringable: function (transferModel) {
                return Bridge.is(transferModel, T);
            },
            ToData: function (transferModel) {
                return (MyONez.Base.AdditionalStuff.ClientServer.TransferMessageParser$1(T).TypeName || "") + ":" + (this.InternalToData(Bridge.cast(Bridge.unbox(transferModel, T), T)) || "");
            },
            ToTransferModel: function (data) {
                return this.InternalToTransferModel(data.substr(((MyONez.Base.AdditionalStuff.ClientServer.TransferMessageParser$1(T).TypeName.length + 1) | 0)));
            }
        }
    }; });

    Bridge.define("MyONez.Base.AdditionalStuff.Effects.WaterReflectionEffect", {
        inherits: [MyONez.Base.AdditionalStuff.Effects.ReflectionEffect],
        fields: {
            firstDisplacementSpeedParam: null,
            perspectiveCorrectionIntensityParam: null,
            screenSpaceVerticalOffsetParam: null,
            secondDisplacementScaleParam: null,
            secondDisplacementSpeedParam: null,
            sparkleColorParam: null,
            sparkleIntensityParam: null,
            timeParam: null
        },
        props: {
            SparkleIntensity: {
                get: function () {
                    return this.sparkleIntensityParam.GetValueSingle();
                },
                set: function (value) {
                    this.sparkleIntensityParam.SetValue$12(value);
                }
            },
            SparkleColor: {
                get: function () {
                    return new Microsoft.Xna.Framework.Color.$ctor3(this.sparkleColorParam.GetValueVector3());
                },
                set: function (value) {
                    this.sparkleColorParam.SetValue$6(value.ToVector3());
                }
            },
            ScreenSpaceVerticalOffset: {
                get: function () {
                    return this.screenSpaceVerticalOffsetParam.GetValueSingle();
                },
                set: function (value) {
                    this.screenSpaceVerticalOffsetParam.SetValue$12(value);
                }
            },
            PerspectiveCorrectionIntensity: {
                get: function () {
                    return this.perspectiveCorrectionIntensityParam.GetValueSingle();
                },
                set: function (value) {
                    this.perspectiveCorrectionIntensityParam.SetValue$12(value);
                }
            },
            FirstDisplacementSpeed: {
                get: function () {
                    return this.firstDisplacementSpeedParam.GetValueSingle();
                },
                set: function (value) {
                    this.firstDisplacementSpeedParam.SetValue$12(value);
                }
            },
            SecondDisplacementSpeed: {
                get: function () {
                    return this.secondDisplacementSpeedParam.GetValueSingle();
                },
                set: function (value) {
                    this.secondDisplacementSpeedParam.SetValue$12(value);
                }
            },
            SecondDisplacementScale: {
                get: function () {
                    return this.secondDisplacementScaleParam.GetValueSingle();
                },
                set: function (value) {
                    this.secondDisplacementScaleParam.SetValue$12(value);
                }
            },
            Time: {
                get: function () {
                    return this.timeParam.GetValueSingle();
                },
                set: function (value) {
                    this.timeParam.SetValue$12(value);
                }
            }
        },
        ctors: {
            ctor: function (effect) {
                this.$initialize();
                MyONez.Base.AdditionalStuff.Effects.ReflectionEffect.ctor.call(this, effect);
                this.CurrentTechnique = this.Techniques.getItem$1("WaterReflectionTechnique");

                this.timeParam = this.Parameters.getItem$1("_time");
                this.sparkleIntensityParam = this.Parameters.getItem$1("_sparkleIntensity");
                this.sparkleColorParam = this.Parameters.getItem$1("_sparkleColor");
                this.screenSpaceVerticalOffsetParam = this.Parameters.getItem$1("_screenSpaceVerticalOffset");
                this.perspectiveCorrectionIntensityParam = this.Parameters.getItem$1("_perspectiveCorrectionIntensity");
                this.firstDisplacementSpeedParam = this.Parameters.getItem$1("_firstDisplacementSpeed");
                this.secondDisplacementSpeedParam = this.Parameters.getItem$1("_secondDisplacementSpeed");
                this.secondDisplacementScaleParam = this.Parameters.getItem$1("_secondDisplacementScale");

                this.SparkleIntensity = 0.015;
                this.SparkleColor = Microsoft.Xna.Framework.Color.White.$clone();
                this.PerspectiveCorrectionIntensity = 0.3;
                this.FirstDisplacementSpeed = 0.06;
                this.SecondDisplacementSpeed = 0.02;
                this.SecondDisplacementScale = 3.0;
                this.ReflectionIntensity = 0.85;
                this.NormalMagnitude = 0.03;
            }
        }
    });

    Bridge.define("MyONez.Base.AdditionalStuff.Materials.PaletteCyclerMaterial", {
        inherits: [SpineEngine.Graphics.Materials.Material$1(MyONez.Base.AdditionalStuff.Effects.PaletteCyclerEffect)],
        ctors: {
            ctor: function () {
                this.$initialize();
                SpineEngine.Graphics.Materials.Material$1(MyONez.Base.AdditionalStuff.Effects.PaletteCyclerEffect).$ctor1.call(this, SpineEngine.Core.Instance.Content.Load(MyONez.Base.AdditionalStuff.Effects.PaletteCyclerEffect, MyONez.Base.AdditionalStuff.Effects.PaletteCyclerEffect.EffectAssetName));
            }
        },
        methods: {
            Update: function (gameTime) {
                SpineEngine.Graphics.Materials.Material$1(MyONez.Base.AdditionalStuff.Effects.PaletteCyclerEffect).prototype.Update.call(this, gameTime);
                this.TypedEffect.Time = gameTime.getTotalSeconds();
            }
        }
    });

    Bridge.define("MyONez.Base.AdditionalStuff.Materials.ReflectionMaterial", {
        inherits: [SpineEngine.Graphics.Materials.Material$1(MyONez.Base.AdditionalStuff.Effects.ReflectionEffect)],
        fields: {
            renderTarget: null,
            RenderTexture: null
        },
        ctors: {
            ctor: function (reflectionRenderer) {
                this.$initialize();
                SpineEngine.Graphics.Materials.Material$1(MyONez.Base.AdditionalStuff.Effects.ReflectionEffect).$ctor1.call(this, SpineEngine.Core.Instance.Content.Load(MyONez.Base.AdditionalStuff.Effects.ReflectionEffect, MyONez.Base.AdditionalStuff.Effects.ReflectionEffect.EffectAssetName));
                this.RenderTexture = reflectionRenderer.RenderTexture;
            }
        },
        methods: {
            OnPreRender: function (camera, entity) {
                SpineEngine.Graphics.Materials.Material$1(MyONez.Base.AdditionalStuff.Effects.ReflectionEffect).prototype.OnPreRender.call(this, camera, entity);
                if (this.renderTarget == null || !Bridge.referenceEquals(this.renderTarget, this.RenderTexture.RenderTarget)) {
                    this.renderTarget = this.RenderTexture.RenderTarget;
                    this.TypedEffect.RenderTexture = this.RenderTexture.RenderTarget;
                }

                this.TypedEffect.MatrixTransform = camera.ViewProjectionMatrix.$clone();
            }
        }
    });

    Bridge.define("MyONez.Base.AdditionalStuff.RenderProcessors.GaussianBlurRenderProcessor", {
        inherits: [SpineEngine.Graphics.RenderProcessors.RenderProcessor$1(MyONez.Base.AdditionalStuff.Effects.GaussianBlurEffect),SpineEngine.ECS.IScreenResolutionChangedListener],
        fields: {
            renderTarget: null,
            renderTargetScale: 0,
            sceneRenderTarget: null
        },
        props: {
            RenderTargetScale: {
                get: function () {
                    return this.renderTargetScale;
                },
                set: function (value) {
                    if (this.renderTargetScale === value) {
                        return;
                    }

                    this.renderTargetScale = value;
                    this.UpdateEffectDeltas();
                }
            }
        },
        alias: ["SceneBackBufferSizeChanged", "SpineEngine$ECS$IScreenResolutionChangedListener$SceneBackBufferSizeChanged"],
        ctors: {
            init: function () {
                this.sceneRenderTarget = new Microsoft.Xna.Framework.Rectangle();
                this.renderTargetScale = 1.0;
            },
            ctor: function (executionOrder) {
                this.$initialize();
                SpineEngine.Graphics.RenderProcessors.RenderProcessor$1(MyONez.Base.AdditionalStuff.Effects.GaussianBlurEffect).ctor.call(this, executionOrder, SpineEngine.Core.Instance.Content.Load(MyONez.Base.AdditionalStuff.Effects.GaussianBlurEffect, MyONez.Base.AdditionalStuff.Effects.GaussianBlurEffect.EffectAssetName));
            }
        },
        methods: {
            SceneBackBufferSizeChanged: function (realRenderTarget, sceneRenderTarget) {
                this.sceneRenderTarget = sceneRenderTarget.$clone();
                this.UpdateEffectDeltas();
            },
            UpdateEffectDeltas: function () {
                if (this.sceneRenderTarget.Width === 0 || this.sceneRenderTarget.Height === 0) {
                    return;
                }

                this.TypedEffect.HorizontalBlurDelta = 1.0 / (this.sceneRenderTarget.Width * this.renderTargetScale);
                this.TypedEffect.VerticalBlurDelta = 1.0 / (this.sceneRenderTarget.Height * this.renderTargetScale);
                this.renderTarget != null ? this.renderTarget.Dispose() : null;
                this.renderTarget = new Microsoft.Xna.Framework.Graphics.RenderTarget2D.$ctor2(SpineEngine.Core.Instance.GraphicsDevice, Bridge.Int.clip32(this.sceneRenderTarget.Width * this.renderTargetScale), Bridge.Int.clip32(this.sceneRenderTarget.Height * this.renderTargetScale), false, SpineEngine.Core.Instance.Screen.BackBufferFormat, Microsoft.Xna.Framework.Graphics.DepthFormat.None, 0, Microsoft.Xna.Framework.Graphics.RenderTargetUsage.PreserveContents);
            },
            Render: function (source, destination) {
                this.TypedEffect.PrepareForHorizontalBlur();
                this.DrawFullScreenQuad(source, this.renderTarget);

                this.TypedEffect.PrepareForVerticalBlur();
                this.DrawFullScreenQuad(this.renderTarget, destination);
            }
        }
    });

    Bridge.define("MyONez.Base.AdditionalStuff.RenderProcessors.HeatDistortionRenderProcessor", {
        inherits: [SpineEngine.Graphics.RenderProcessors.RenderProcessor$1(MyONez.Base.AdditionalStuff.Effects.HeatDistortionEffect)],
        fields: {
            distortionFactor: 0,
            riseFactor: 0,
            elapsed: 0
        },
        props: {
            DistortionFactor: {
                get: function () {
                    return this.distortionFactor;
                },
                set: function (value) {
                    if (this.distortionFactor === value) {
                        return;
                    }

                    this.distortionFactor = value;
                    if (this.TypedEffect != null) {
                        this.TypedEffect.DistortionFactor = this.distortionFactor;
                    }
                }
            },
            RiseFactor: {
                get: function () {
                    return this.riseFactor;
                },
                set: function (value) {
                    if (this.riseFactor === value) {
                        return;
                    }

                    this.riseFactor = value;
                    if (this.TypedEffect != null) {
                        this.TypedEffect.RiseFactor = this.riseFactor;
                    }
                }
            },
            DistortionTexture: {
                set: function (value) {
                    this.TypedEffect.DistortionTexture = value;
                }
            }
        },
        ctors: {
            init: function () {
                this.distortionFactor = 0.005;
                this.riseFactor = 0.15;
            },
            ctor: function (executionOrder) {
                this.$initialize();
                SpineEngine.Graphics.RenderProcessors.RenderProcessor$1(MyONez.Base.AdditionalStuff.Effects.HeatDistortionEffect).ctor.call(this, executionOrder);
            }
        },
        methods: {
            OnAddedToScene: function (scene) {
                this.TypedEffect = scene.Content.Load(MyONez.Base.AdditionalStuff.Effects.HeatDistortionEffect, MyONez.Base.AdditionalStuff.Effects.HeatDistortionEffect.EffectAssetName);

                this.TypedEffect.DistortionFactor = this.distortionFactor;
                this.TypedEffect.RiseFactor = this.riseFactor;

                this.DistortionTexture = scene.Content.Load(Microsoft.Xna.Framework.Graphics.Texture2D, MyONez.Base.AdditionalStuff.ContentPaths.Textures.heatDistortionNoise);
            },
            Update: function (gameTime) {
                SpineEngine.Graphics.RenderProcessors.RenderProcessor$1(MyONez.Base.AdditionalStuff.Effects.HeatDistortionEffect).prototype.Update.call(this, gameTime);
                this.elapsed += gameTime.getTotalSeconds();
                this.TypedEffect.Time = this.elapsed;
            }
        }
    });

    Bridge.define("MyONez.Base.AdditionalStuff.RenderProcessors.PixelBloomRenderProcessor", {
        inherits: [MyONez.Base.AdditionalStuff.RenderProcessors.BloomRenderProcessor],
        fields: {
            layerRt: null,
            tempRt: null
        },
        alias: ["SceneBackBufferSizeChanged", "SpineEngine$ECS$IScreenResolutionChangedListener$SceneBackBufferSizeChanged"],
        ctors: {
            ctor: function (layerRenderTexture, executionOrder) {
                this.$initialize();
                MyONez.Base.AdditionalStuff.RenderProcessors.BloomRenderProcessor.ctor.call(this, executionOrder);
                this.layerRt = layerRenderTexture;
                this.tempRt = new SpineEngine.Graphics.RenderTexture.$ctor3(this.layerRt.RenderTarget.Width, this.layerRt.RenderTarget.Height, Microsoft.Xna.Framework.Graphics.DepthFormat.None);
            }
        },
        methods: {
            SceneBackBufferSizeChanged: function (realRenderTarget, sceneRenderTarget) {
                MyONez.Base.AdditionalStuff.RenderProcessors.BloomRenderProcessor.prototype.SceneBackBufferSizeChanged.call(this, realRenderTarget.$clone(), sceneRenderTarget.$clone());

                this.tempRt.Resize(sceneRenderTarget.Width, sceneRenderTarget.Height);
            },
            Render: function (source, destination) {
                MyONez.Base.AdditionalStuff.RenderProcessors.BloomRenderProcessor.prototype.Render.call(this, SpineEngine.Graphics.RenderTexture.op_Implicit(this.layerRt), SpineEngine.Graphics.RenderTexture.op_Implicit(this.tempRt));

                this.Batch.Clear();
                this.Batch.Draw(source, SpineEngine.Maths.RectangleF.op_Implicit$1(destination.Bounds.$clone()), SpineEngine.Maths.RectangleF.op_Implicit$1(source.Bounds.$clone()), Microsoft.Xna.Framework.Color.White.$clone(), 0);
                this.Batch.Draw(SpineEngine.Graphics.RenderTexture.op_Implicit(this.tempRt), SpineEngine.Maths.RectangleF.op_Implicit$1(destination.Bounds.$clone()), SpineEngine.Maths.RectangleF.op_Implicit$1(this.tempRt.RenderTarget.Bounds.$clone()), Microsoft.Xna.Framework.Color.White.$clone(), 0);
                this.Batch.Draw(SpineEngine.Graphics.RenderTexture.op_Implicit(this.layerRt), SpineEngine.Maths.RectangleF.op_Implicit$1(destination.Bounds.$clone()), SpineEngine.Maths.RectangleF.op_Implicit$1(this.layerRt.RenderTarget.Bounds.$clone()), Microsoft.Xna.Framework.Color.White.$clone(), 0);

                this.Material.BlendState = Microsoft.Xna.Framework.Graphics.BlendState.AlphaBlend;
                this.Material.SamplerState = this.SamplerState;
                this.Material.DepthStencilState = Microsoft.Xna.Framework.Graphics.DepthStencilState.None;

                SpineEngine.Graphics.Graphic.Draw(destination, Microsoft.Xna.Framework.Color.Black.$clone(), this.Batch, this.Material);
            },
            Unload: function () {
                MyONez.Base.AdditionalStuff.RenderProcessors.BloomRenderProcessor.prototype.Unload.call(this);

                this.tempRt.Dispose();
            }
        }
    });

    Bridge.define("MyONez.Base.AdditionalStuff.RenderProcessors.PixelGlitchRenderProcessor", {
        inherits: [SpineEngine.Graphics.RenderProcessors.RenderProcessor$1(MyONez.Base.AdditionalStuff.Effects.PixelGlitchEffect),SpineEngine.ECS.IScreenResolutionChangedListener],
        fields: {
            horizontalOffset: 0,
            verticalSize: 0
        },
        props: {
            VerticalSize: {
                get: function () {
                    return this.verticalSize;
                },
                set: function (value) {
                    if (this.verticalSize === value) {
                        return;
                    }

                    this.verticalSize = value;
                    if (this.TypedEffect != null) {
                        this.TypedEffect.VerticalSize = this.verticalSize;
                    }
                }
            },
            HorizontalOffset: {
                get: function () {
                    return this.horizontalOffset;
                },
                set: function (value) {
                    if (this.horizontalOffset === value) {
                        return;
                    }

                    this.horizontalOffset = value;
                    if (this.TypedEffect != null) {
                        this.TypedEffect.HorizontalOffset = this.horizontalOffset;
                    }
                }
            }
        },
        alias: ["SceneBackBufferSizeChanged", "SpineEngine$ECS$IScreenResolutionChangedListener$SceneBackBufferSizeChanged"],
        ctors: {
            init: function () {
                this.horizontalOffset = 10.0;
                this.verticalSize = 5.0;
            },
            ctor: function (executionOrder) {
                this.$initialize();
                SpineEngine.Graphics.RenderProcessors.RenderProcessor$1(MyONez.Base.AdditionalStuff.Effects.PixelGlitchEffect).ctor.call(this, executionOrder);
            }
        },
        methods: {
            SceneBackBufferSizeChanged: function (realRenderTarget, sceneRenderTarget) {
                this.TypedEffect.ScreenSize = new Microsoft.Xna.Framework.Vector2.$ctor2(sceneRenderTarget.Width, sceneRenderTarget.Height);
            },
            OnAddedToScene: function (scene) {
                this.TypedEffect = scene.Content.Load(MyONez.Base.AdditionalStuff.Effects.PixelGlitchEffect, MyONez.Base.AdditionalStuff.Effects.PixelGlitchEffect.EffectAssetName);
                this.TypedEffect.VerticalSize = this.verticalSize;
                this.TypedEffect.HorizontalOffset = this.horizontalOffset;
                this.TypedEffect.ScreenSize = new Microsoft.Xna.Framework.Vector2.$ctor2(SpineEngine.Core.Instance.Screen.Width, SpineEngine.Core.Instance.Screen.Height);
            }
        }
    });

    Bridge.define("MyONez.Base.AdditionalStuff.RenderProcessors.PixelMosaicRenderProcessor", {
        inherits: [SpineEngine.Graphics.RenderProcessors.RenderProcessor$1(MyONez.Base.AdditionalStuff.Effects.MultiTextureOverlayEffect),SpineEngine.ECS.IScreenResolutionChangedListener],
        fields: {
            CellColor: null,
            lastMosaicScale: 0,
            mosaicRenderTex: null,
            mosaicTexture: null,
            tmpMaterial: null
        },
        props: {
            Scene: null
        },
        alias: ["SceneBackBufferSizeChanged", "SpineEngine$ECS$IScreenResolutionChangedListener$SceneBackBufferSizeChanged"],
        ctors: {
            init: function () {
                var $t;
                this.CellColor = new Microsoft.Xna.Framework.Color();
                this.CellColor = new Microsoft.Xna.Framework.Color.$ctor10(8421504);
                this.lastMosaicScale = -1;
                this.tmpMaterial = ($t = new SpineEngine.Graphics.Materials.Material(), $t.SamplerState = Microsoft.Xna.Framework.Graphics.SamplerState.PointWrap, $t);
            },
            ctor: function (executionOrder) {
                this.$initialize();
                SpineEngine.Graphics.RenderProcessors.RenderProcessor$1(MyONez.Base.AdditionalStuff.Effects.MultiTextureOverlayEffect).ctor.call(this, executionOrder);
            }
        },
        methods: {
            SceneBackBufferSizeChanged: function (realRenderTarget, sceneRenderTarget) {
                var screenWidth = realRenderTarget.Width;
                var screenHeight = realRenderTarget.Height;

                var screenAspectRatio = screenWidth / screenHeight;
                var designSize = this.Scene.DesignResolutionSize.$clone();

                var pixelPerfectScale = 1;
                if (designSize.X / designSize.Y > screenAspectRatio) {
                    pixelPerfectScale = (Bridge.Int.div(screenWidth, designSize.X)) | 0;
                } else {
                    pixelPerfectScale = (Bridge.Int.div(screenHeight, designSize.Y)) | 0;
                }

                if (pixelPerfectScale === 0) {
                    pixelPerfectScale = 1;
                }

                if (this.lastMosaicScale !== pixelPerfectScale) {
                    this.CreateMosaicTexture(Bridge.Int.mul(50, pixelPerfectScale));
                    this.lastMosaicScale = pixelPerfectScale;
                }

                this.mosaicRenderTex != null ? this.mosaicRenderTex.Dispose() : null;
                this.mosaicRenderTex = new Microsoft.Xna.Framework.Graphics.RenderTarget2D.$ctor2(SpineEngine.Core.Instance.GraphicsDevice, Bridge.Int.mul(sceneRenderTarget.Width, pixelPerfectScale), Bridge.Int.mul(sceneRenderTarget.Height, pixelPerfectScale), false, SpineEngine.Core.Instance.Screen.BackBufferFormat, Microsoft.Xna.Framework.Graphics.DepthFormat.None, 0, Microsoft.Xna.Framework.Graphics.RenderTargetUsage.PreserveContents);

                this.Batch.Clear();
                this.Batch.Draw(this.mosaicTexture, SpineEngine.Maths.RectangleF.op_Implicit$1(this.mosaicRenderTex.Bounds.$clone()), SpineEngine.Maths.RectangleF.op_Implicit$1(this.mosaicRenderTex.Bounds.$clone()), Microsoft.Xna.Framework.Color.White.$clone(), 0);

                SpineEngine.Graphics.Graphic.Draw(this.mosaicRenderTex, Microsoft.Xna.Framework.Color.Black.$clone(), this.Batch, this.tmpMaterial);

                this.TypedEffect.SecondTexture = this.mosaicRenderTex;
            },
            OnAddedToScene: function (scene) {
                SpineEngine.Graphics.RenderProcessors.RenderProcessor$1(MyONez.Base.AdditionalStuff.Effects.MultiTextureOverlayEffect).prototype.OnAddedToScene.call(this, scene);
                this.Scene = scene;
                this.Effect = this.Scene.Content.Load(MyONez.Base.AdditionalStuff.Effects.MultiTextureOverlayEffect, MyONez.Base.AdditionalStuff.Effects.MultiTextureOverlayEffect.EffectAssetName);
            },
            CreateMosaicTexture: function (size) {
                this.mosaicTexture != null ? this.mosaicTexture.Dispose() : null;

                this.mosaicTexture = new Microsoft.Xna.Framework.Graphics.Texture2D.ctor(SpineEngine.Core.Instance.GraphicsDevice, size, size);
                var colors = System.Array.init(Bridge.Int.mul(size, size), 0, System.UInt32);

                for (var i = 0; i < colors.length; i = (i + 1) | 0) {
                    colors[System.Array.index(i, colors)] = this.CellColor.PackedValue;
                }

                colors[System.Array.index(0, colors)] = 4294967295;
                colors[System.Array.index(((Bridge.Int.mul(size, size) - 1) | 0), colors)] = 4278190080;

                for (var x = 1; x < ((size - 1) | 0); x = (x + 1) | 0) {
                    colors[System.Array.index(Bridge.Int.mul(x, size), colors)] = 4292927712;
                    colors[System.Array.index(((Bridge.Int.mul(x, size) + 1) | 0), colors)] = 4294967295;
                    colors[System.Array.index(((((Bridge.Int.mul(x, size) + size) | 0) - 1) | 0), colors)] = 4278190080;
                }

                for (var y = 1; y < ((size - 1) | 0); y = (y + 1) | 0) {
                    colors[System.Array.index(y, colors)] = 4294967295;
                    colors[System.Array.index(((Bridge.Int.mul((((size - 1) | 0)), size) + y) | 0), colors)] = 4278190080;
                }

                this.mosaicTexture.SetData(System.UInt32, colors);
            },
            Unload: function () {
                SpineEngine.Graphics.RenderProcessors.RenderProcessor$1(MyONez.Base.AdditionalStuff.Effects.MultiTextureOverlayEffect).prototype.Unload.call(this);
                this.mosaicTexture.Dispose();
                this.mosaicRenderTex.Dispose();
            }
        }
    });

    /** @namespace MyONez.Base.AdditionalStuff.RenderProcessors */

    /**
     * post processor to assist with making blended poly lights. Usage is as follows:
         - render all sprite lights with a separate Renderer to a RenderTarget. The clear color of the Renderer is your ambient light color.
         - render all normal objects in standard fashion
         - add this PostProcessor with the RenderTarget from your lights Renderer
     *
     * @public
     * @class MyONez.Base.AdditionalStuff.RenderProcessors.PolyLightRenderProcessor
     * @augments SpineEngine.Graphics.RenderProcessors.RenderProcessor$1
     * @implements  SpineEngine.ECS.IScreenResolutionChangedListener
     */
    Bridge.define("MyONez.Base.AdditionalStuff.RenderProcessors.PolyLightRenderProcessor", {
        inherits: [SpineEngine.Graphics.RenderProcessors.RenderProcessor$1(MyONez.Base.AdditionalStuff.Effects.SpriteLightMultiplyEffect),SpineEngine.ECS.IScreenResolutionChangedListener],
        fields: {
            lightsRenderTexture: null,
            blurEffect: null,
            blurEnabled: false,
            blurRenderTargetScale: 0,
            multiplicativeFactor: 0,
            renderTarget: null,
            scene: null,
            sceneRenderTarget: null
        },
        props: {
            MultiplicativeFactor: {
                get: function () {
                    return this.multiplicativeFactor;
                },
                set: function (value) {
                    if (this.TypedEffect != null) {
                        this.TypedEffect.MultiplicativeFactor = value;
                    }

                    this.multiplicativeFactor = value;
                }
            },
            EnableBlur: {
                get: function () {
                    return this.blurEnabled;
                },
                set: function (value) {
                    if (value === this.blurEnabled) {
                        return;
                    }

                    this.blurEnabled = value;
                    if (!this.blurEnabled || this.blurEffect != null || this.scene == null) {
                        return;
                    }

                    this.blurEffect = SpineEngine.Core.Instance.Content.Load(MyONez.Base.AdditionalStuff.Effects.GaussianBlurEffect, MyONez.Base.AdditionalStuff.Effects.GaussianBlurEffect.EffectAssetName);
                    this.UpdateBlurEffectDeltas();
                }
            },
            BlurRenderTargetScale: {
                get: function () {
                    return this.blurRenderTargetScale;
                },
                set: function (value) {
                    if (this.blurRenderTargetScale !== value) {
                        this.blurRenderTargetScale = value;
                        if (this.blurEffect != null) {
                            this.UpdateBlurEffectDeltas();
                        }
                    }
                }
            },
            BlurAmount: {
                get: function () {
                    var $t;
                    return ($t = (this.blurEffect != null ? this.blurEffect.BlurAmount : null), $t != null ? $t : -1);
                },
                set: function (value) {
                    if (this.blurEffect != null) {
                        this.blurEffect.BlurAmount = value;
                    }
                }
            }
        },
        alias: ["SceneBackBufferSizeChanged", "SpineEngine$ECS$IScreenResolutionChangedListener$SceneBackBufferSizeChanged"],
        ctors: {
            init: function () {
                this.sceneRenderTarget = new Microsoft.Xna.Framework.Rectangle();
                this.blurRenderTargetScale = 0.5;
                this.multiplicativeFactor = 1.0;
            },
            ctor: function (executionOrder, lightsRenderTexture) {
                this.$initialize();
                SpineEngine.Graphics.RenderProcessors.RenderProcessor$1(MyONez.Base.AdditionalStuff.Effects.SpriteLightMultiplyEffect).ctor.call(this, executionOrder);
                this.lightsRenderTexture = lightsRenderTexture;
            }
        },
        methods: {
            SceneBackBufferSizeChanged: function (realRenderTarget, sceneRenderTarget) {
                this.sceneRenderTarget = sceneRenderTarget.$clone();
                this.TypedEffect.LightTexture = SpineEngine.Graphics.RenderTexture.op_Implicit(this.lightsRenderTexture);

                if (this.blurEnabled) {
                    this.UpdateBlurEffectDeltas();
                }
            },
            UpdateBlurEffectDeltas: function () {
                if (this.sceneRenderTarget.Width === 0 || this.sceneRenderTarget.Height === 0) {
                    return;
                }

                this.blurEffect.HorizontalBlurDelta = 1.0 / (this.sceneRenderTarget.Width * this.blurRenderTargetScale);
                this.blurEffect.VerticalBlurDelta = 1.0 / (this.sceneRenderTarget.Height * this.blurRenderTargetScale);

                this.renderTarget != null ? this.renderTarget.Dispose() : null;
                this.renderTarget = new Microsoft.Xna.Framework.Graphics.RenderTarget2D.$ctor2(SpineEngine.Core.Instance.GraphicsDevice, Bridge.Int.clip32(this.sceneRenderTarget.Width * this.blurRenderTargetScale), Bridge.Int.clip32(this.sceneRenderTarget.Height * this.blurRenderTargetScale), false, SpineEngine.Core.Instance.Screen.BackBufferFormat, Microsoft.Xna.Framework.Graphics.DepthFormat.None, 0, Microsoft.Xna.Framework.Graphics.RenderTargetUsage.PreserveContents);
            },
            OnAddedToScene: function (scene) {
                this.scene = scene;
                this.TypedEffect = this.scene.Content.Load(MyONez.Base.AdditionalStuff.Effects.SpriteLightMultiplyEffect, MyONez.Base.AdditionalStuff.Effects.SpriteLightMultiplyEffect.EffectAssetName);
                this.TypedEffect.LightTexture = SpineEngine.Graphics.RenderTexture.op_Implicit(this.lightsRenderTexture);
                this.TypedEffect.MultiplicativeFactor = this.multiplicativeFactor;

                if (this.blurEnabled) {
                    this.blurEffect = SpineEngine.Core.Instance.Content.Load(MyONez.Base.AdditionalStuff.Effects.GaussianBlurEffect, MyONez.Base.AdditionalStuff.Effects.GaussianBlurEffect.EffectAssetName);
                }
            },
            Render: function (source, destination) {
                if (this.blurEnabled) {
                    this.blurEffect.PrepareForHorizontalBlur();
                    this.DrawFullScreenQuad(SpineEngine.Graphics.RenderTexture.op_Implicit(this.lightsRenderTexture), this.renderTarget, this.blurEffect);

                    this.blurEffect.PrepareForVerticalBlur();
                    this.DrawFullScreenQuad(this.renderTarget, SpineEngine.Graphics.RenderTexture.op_Implicit(this.lightsRenderTexture), this.blurEffect);
                }

                this.DrawFullScreenQuad(source, destination);
            }
        }
    });

    Bridge.define("MyONez.Base.AdditionalStuff.RenderProcessors.ScanlinesRenderProcessor", {
        inherits: [SpineEngine.Graphics.RenderProcessors.RenderProcessor$1(MyONez.Base.AdditionalStuff.Effects.ScanlinesEffect)],
        ctors: {
            ctor: function (executionOrder) {
                this.$initialize();
                SpineEngine.Graphics.RenderProcessors.RenderProcessor$1(MyONez.Base.AdditionalStuff.Effects.ScanlinesEffect).ctor.call(this, executionOrder, SpineEngine.Core.Instance.Content.Load(MyONez.Base.AdditionalStuff.Effects.ScanlinesEffect, MyONez.Base.AdditionalStuff.Effects.ScanlinesEffect.EffectAssetName));
            }
        }
    });

    /**
     * post processor to assist with making blended sprite lights. Usage is as follows:
         - render all sprite lights with a separate Renderer to a RenderTarget. The clear color of the Renderer is your ambient light color.
         - render all normal objects in standard fashion
         - add this PostProcessor with the RenderTarget from your lights Renderer
     *
     * @public
     * @class MyONez.Base.AdditionalStuff.RenderProcessors.SpriteLightRenderProcessor
     * @augments SpineEngine.Graphics.RenderProcessors.RenderProcessor$1
     * @implements  SpineEngine.ECS.IScreenResolutionChangedListener
     */
    Bridge.define("MyONez.Base.AdditionalStuff.RenderProcessors.SpriteLightRenderProcessor", {
        inherits: [SpineEngine.Graphics.RenderProcessors.RenderProcessor$1(MyONez.Base.AdditionalStuff.Effects.SpriteLightMultiplyEffect),SpineEngine.ECS.IScreenResolutionChangedListener],
        fields: {
            lightsRenderTexture: null,
            multiplicativeFactor: 0
        },
        props: {
            MultiplicativeFactor: {
                get: function () {
                    return this.multiplicativeFactor;
                },
                set: function (value) {
                    if (this.TypedEffect != null) {
                        this.TypedEffect.MultiplicativeFactor = value;
                    }

                    this.multiplicativeFactor = value;
                }
            }
        },
        alias: ["SceneBackBufferSizeChanged", "SpineEngine$ECS$IScreenResolutionChangedListener$SceneBackBufferSizeChanged"],
        ctors: {
            init: function () {
                this.multiplicativeFactor = 1.0;
            },
            ctor: function (executionOrder, lightsRenderTexture) {
                this.$initialize();
                SpineEngine.Graphics.RenderProcessors.RenderProcessor$1(MyONez.Base.AdditionalStuff.Effects.SpriteLightMultiplyEffect).ctor.call(this, executionOrder);
                this.lightsRenderTexture = lightsRenderTexture;
            }
        },
        methods: {
            SceneBackBufferSizeChanged: function (realRenderTarget, sceneRenderTarget) {
                this.TypedEffect.LightTexture = SpineEngine.Graphics.RenderTexture.op_Implicit(this.lightsRenderTexture);
            },
            OnAddedToScene: function (scene) {
                this.TypedEffect = scene.Content.Load(MyONez.Base.AdditionalStuff.Effects.SpriteLightMultiplyEffect, MyONez.Base.AdditionalStuff.Effects.SpriteLightMultiplyEffect.EffectAssetName);
                this.TypedEffect.LightTexture = SpineEngine.Graphics.RenderTexture.op_Implicit(this.lightsRenderTexture);
                this.TypedEffect.MultiplicativeFactor = this.multiplicativeFactor;
            }
        }
    });

    Bridge.define("MyONez.Base.AdditionalStuff.RenderProcessors.VignetteRenderProcessor", {
        inherits: [SpineEngine.Graphics.RenderProcessors.RenderProcessor$1(MyONez.Base.AdditionalStuff.Effects.VignetteEffect)],
        fields: {
            power: 0,
            radius: 0
        },
        props: {
            Power: {
                get: function () {
                    return this.power;
                },
                set: function (value) {
                    if (this.power === value) {
                        return;
                    }

                    this.power = value;
                    if (this.TypedEffect != null) {
                        this.TypedEffect.Power = this.power;
                    }
                }
            },
            Radius: {
                get: function () {
                    return this.radius;
                },
                set: function (value) {
                    if (this.radius === value) {
                        return;
                    }

                    this.radius = value;
                    if (this.TypedEffect != null) {
                        this.TypedEffect.Radius = this.radius;
                    }
                    ;
                }
            }
        },
        ctors: {
            init: function () {
                this.power = 1.0;
                this.radius = 1.25;
            },
            ctor: function (executionOrder) {
                this.$initialize();
                SpineEngine.Graphics.RenderProcessors.RenderProcessor$1(MyONez.Base.AdditionalStuff.Effects.VignetteEffect).ctor.call(this, executionOrder);
            }
        },
        methods: {
            OnAddedToScene: function (scene) {
                this.TypedEffect = scene.Content.Load(MyONez.Base.AdditionalStuff.Effects.VignetteEffect, MyONez.Base.AdditionalStuff.Effects.VignetteEffect.EffectAssetName);

                this.TypedEffect.Power = this.power;
                this.TypedEffect.Radius = this.radius;
            }
        }
    });

    Bridge.define("MyONez.Base.AdditionalStuff.TiledMap.Models.TiledImageLayer", {
        inherits: [MyONez.Base.AdditionalStuff.TiledMap.Models.TiledLayer],
        fields: {
            AssetName: null
        }
    });

    Bridge.define("MyONez.Base.AdditionalStuff.TiledMap.Models.TiledTileLayer", {
        inherits: [MyONez.Base.AdditionalStuff.TiledMap.Models.TiledLayer],
        fields: {
            X: 0,
            Y: 0,
            Width: 0,
            Height: 0,
            Tiles: null,
            Color: null
        },
        ctors: {
            init: function () {
                this.Color = new Microsoft.Xna.Framework.Color();
                this.Color = Microsoft.Xna.Framework.Color.White.$clone();
            }
        },
        methods: {
            GetTile: function (x, y) {
                return this.Tiles[System.Array.index(((x + Bridge.Int.mul(y, this.Width)) | 0), this.Tiles)];
            },
            SetTile: function (x, y, tile) {
                this.Tiles[System.Array.index(((x + Bridge.Int.mul(y, this.Width)) | 0), this.Tiles)] = tile;
            },
            RemoveTile$1: function (x, y) {
                this.Tiles[System.Array.index(((x + Bridge.Int.mul(y, this.Width)) | 0), this.Tiles)] = null;
            },
            RemoveTile: function (tile) {
                for (var index = 0; index < this.Tiles.length; index = (index + 1) | 0) {
                    if (Bridge.referenceEquals(tile, this.Tiles[System.Array.index(index, this.Tiles)])) {
                        this.Tiles[System.Array.index(index, this.Tiles)] = null;
                    }
                }
            }
        }
    });

    Bridge.define("MyONez.Base.AdditionalStuff.TiledMap.PipelineImporter.TiledMapReader", {
        inherits: [Microsoft.Xna.Framework.Content.ContentTypeReader$1(MyONez.Base.AdditionalStuff.TiledMap.Models.TiledMap)],
        methods: {
            Read$1: function (reader, existingInstance) {
                var result = new MyONez.Base.AdditionalStuff.TiledMap.Models.TiledMap();
                result.FirstGid = reader.ReadInt32();
                result.Width = reader.ReadInt32();
                result.Height = reader.ReadInt32();
                result.TileWidth = reader.ReadInt32();
                result.TileHeight = reader.ReadInt32();
                if (reader.ReadBoolean()) {
                    result.BackgroundColor = reader.ReadColor();
                }
                result.RenderOrder = reader.ReadInt32();
                result.Orientation = reader.ReadInt32();
                this.ReadProperties(reader, result.Properties);
                var layerCount = reader.ReadInt32();
                for (var i = 0; i < layerCount; i = (i + 1) | 0) {
                    var layerType = reader.ReadInt32();
                    var layer = null;
                    if (layerType === 1) {
                        var newLayer = new MyONez.Base.AdditionalStuff.TiledMap.Models.TiledImageLayer();
                        newLayer.AssetName = reader.ReadString();
                        layer = newLayer;
                    } else if (layerType === 2) {
                        var newLayer1 = new MyONez.Base.AdditionalStuff.TiledMap.Models.TiledTileLayer();
                        newLayer1.X = reader.ReadInt32();
                        newLayer1.Y = reader.ReadInt32();
                        newLayer1.Width = reader.ReadInt32();
                        newLayer1.Height = reader.ReadInt32();
                        newLayer1.Tiles = System.Array.init(reader.ReadInt32(), null, MyONez.Base.AdditionalStuff.TiledMap.Models.TiledTile);

                        for (var j = 0; j < newLayer1.Tiles.length; j = (j + 1) | 0) {
                            if (reader.ReadBoolean()) {
                                newLayer1.Tiles[System.Array.index(j, newLayer1.Tiles)] = new MyONez.Base.AdditionalStuff.TiledMap.Models.TiledTile();
                                newLayer1.Tiles[System.Array.index(j, newLayer1.Tiles)].Id = reader.ReadInt32();
                                newLayer1.Tiles[System.Array.index(j, newLayer1.Tiles)].FlippedHorizonally = reader.ReadBoolean();
                                newLayer1.Tiles[System.Array.index(j, newLayer1.Tiles)].FlippedVertically = reader.ReadBoolean();
                                newLayer1.Tiles[System.Array.index(j, newLayer1.Tiles)].FlippedDiagonally = reader.ReadBoolean();
                            }
                        }

                        newLayer1.Color = reader.ReadColor();
                        layer = newLayer1;
                    }

                    if (layer == null) {
                        throw new System.NotSupportedException.ctor();
                    }

                    result.Layers.add(layer);
                    layer.Offset = reader.ReadVector2();
                    this.ReadProperties(reader, layer.Properties);
                    layer.Name = reader.ReadString();
                    layer.Visible = reader.ReadBoolean();
                    layer.Opacity = reader.ReadSingle();
                }
                var objectGroupsCount = reader.ReadInt32();
                for (var i1 = 0; i1 < objectGroupsCount; i1 = (i1 + 1) | 0) {
                    var objectGroup = new MyONez.Base.AdditionalStuff.TiledMap.Models.TiledObjectGroup();
                    result.ObjectGroups.add(objectGroup);

                    objectGroup.Name = reader.ReadString();
                    objectGroup.Color = reader.ReadColor();
                    objectGroup.Opacity = reader.ReadSingle();
                    objectGroup.Visible = reader.ReadBoolean();
                    this.ReadProperties(reader, objectGroup.Properties);
                    var objectsCount = reader.ReadInt32();
                    for (var j1 = 0; j1 < objectsCount; j1 = (j1 + 1) | 0) {
                        var obj = new MyONez.Base.AdditionalStuff.TiledMap.Models.TiledObject();
                        objectGroup.Objects.add(obj);

                        obj.Id = reader.ReadInt32();
                        obj.Name = reader.ReadString();
                        obj.Type = reader.ReadString();
                        obj.X = reader.ReadInt32();
                        obj.Y = reader.ReadInt32();
                        obj.Width = reader.ReadInt32();
                        obj.Height = reader.ReadInt32();
                        obj.Rotation = reader.ReadInt32();
                        obj.Gid = reader.ReadInt32();
                        obj.Visible = reader.ReadBoolean();
                        obj.TiledObjectType = reader.ReadInt32();
                        obj.ObjectType = reader.ReadString();
                        var pointsCount = reader.ReadInt32();
                        for (var k = 0; k < pointsCount; k = (k + 1) | 0) {
                            obj.PolyPoints.add(reader.ReadVector2());
                        }
                        this.ReadProperties(reader, obj.Properties);
                    }
                }

                var tileSetCount = reader.ReadInt32();
                for (var i2 = 0; i2 < tileSetCount; i2 = (i2 + 1) | 0) {
                    var tileSet = new MyONez.Base.AdditionalStuff.TiledMap.Models.TiledTileSet();
                    result.TileSets.add(tileSet);
                    tileSet.Spacing = reader.ReadInt32();
                    tileSet.Margin = reader.ReadInt32();
                    this.ReadProperties(reader, tileSet.Properties);

                    var tileCount = reader.ReadInt32();
                    for (var j2 = 0; j2 < tileCount; j2 = (j2 + 1) | 0) {
                        var tile = new MyONez.Base.AdditionalStuff.TiledMap.Models.TiledTileSetTile();
                        tileSet.Tiles.add(tile);
                        tile.Id = reader.ReadInt32();
                        if (reader.ReadBoolean()) {
                            var animationFrameCount = reader.ReadInt32();
                            tile.AnimationFrames = new (System.Collections.Generic.List$1(MyONez.Base.AdditionalStuff.TiledMap.Models.TiledTileSetAnimationFrame)).$ctor2(animationFrameCount);
                            for (var k1 = 0; k1 < animationFrameCount; k1 = (k1 + 1) | 0) {
                                var animationFrame = new MyONez.Base.AdditionalStuff.TiledMap.Models.TiledTileSetAnimationFrame();
                                tile.AnimationFrames.add(animationFrame);

                                animationFrame.TileId = reader.ReadInt32();
                                animationFrame.Duration = reader.ReadSingle();
                            }
                        }

                        this.ReadProperties(reader, tile.Properties);
                        var x = reader.ReadInt32();
                        var y = reader.ReadInt32();
                        var width = reader.ReadInt32();
                        var height = reader.ReadInt32();
                        tile.SourceRect = new Microsoft.Xna.Framework.Rectangle.$ctor2(x, y, width, height);
                    }

                    tileSet.FirstGid = reader.ReadInt32();
                    tileSet.Image = reader.ReadString();
                    tileSet.ImageTexture = reader.ContentManager.Load(Microsoft.Xna.Framework.Graphics.Texture2D, tileSet.Image);
                }

                return result;
            },
            ReadProperties: function (reader, dataProperties) {
                dataProperties.clear();
                var count = reader.ReadInt32();
                for (var i = 0; i < count; i = (i + 1) | 0) {
                    var key = reader.ReadString();
                    var value = reader.ReadString();
                    dataProperties.set(key, value);
                }
            }
        }
    });

    Bridge.define("MyONez.Base.Screens.AIScene", {
        inherits: [MyONez.Base.Screens.BaseScene],
        ctors: {
            ctor: function () {
                var $t;
                this.$initialize();
                MyONez.Base.Screens.BaseScene.ctor.call(this);
                this.SetDesignResolution(1280, 720, SpineEngine.Graphics.ResolutionPolicy.SceneResolutionPolicy.BestFit);
                SpineEngine.Core.Instance.Screen.SetSize(1280, 720);

                this.AddRenderer(SpineEngine.Graphics.Renderers.RenderLayerExcludeRenderer, new SpineEngine.Graphics.Renderers.RenderLayerExcludeRenderer([MyONez.Base.Screens.BaseScene.ScreenSpaceRenderLayer]));
                this.AddRenderer(SpineEngine.Graphics.Renderers.ScreenSpaceRenderer, new SpineEngine.Graphics.Renderers.ScreenSpaceRenderer([MyONez.Base.Screens.BaseScene.ScreenSpaceRenderLayer]));

                this.Camera.RawZoom = 25;

                var globalEntity = this.CreateEntity("global");
                var map = globalEntity.AddComponent(MyONez.Base.Screens.MapComponent);
                map.Texture = this.Content.Load(Microsoft.Xna.Framework.Graphics.Texture2D, MyONez.Base.ContentPaths.Basic.moon);

                for (var x = 0; x < map.Map.Width; x = (x + 1) | 0) {
                    map.Map.Walls.add(new BrainAI.Pathfinding.Point.$ctor1(x, 0));
                    map.Map.Walls.add(new BrainAI.Pathfinding.Point.$ctor1(x, ((map.Map.Height - 1) | 0)));
                }
                for (var y = 0; y < map.Map.Height; y = (y + 1) | 0) {
                    map.Map.Walls.add(new BrainAI.Pathfinding.Point.$ctor1(0, y));
                    map.Map.Walls.add(new BrainAI.Pathfinding.Point.$ctor1(((map.Map.Width - 1) | 0), y));
                }

                for (var i = 0; i < 100; i = (i + 1) | 0) {
                    this.AddWall(map);
                }

                var food = this.CreateEntity("Food");
                food.AddComponent(SpineEngine.ECS.Components.PositionComponent).Position = new Microsoft.Xna.Framework.Vector2.$ctor2(50, 50);
                food.AddComponent(SpineEngine.ECS.Components.ColorComponent).Color = Microsoft.Xna.Framework.Color.Green.$clone();
                food.AddComponent(SpineEngine.ECS.Components.SpriteComponent).Drawable = new SpineEngine.Graphics.Drawable.SubtextureDrawable.$ctor2(SpineEngine.Graphics.Graphic.PixelTexture, 0, 0, 1, 1);

                var snake = this.CreateEntity("Snake");
                snake.AddComponent(SpineEngine.ECS.Components.PositionComponent).Position = new Microsoft.Xna.Framework.Vector2.$ctor2(10, 10);
                snake.AddComponent(SpineEngine.ECS.Components.ColorComponent).Color = Microsoft.Xna.Framework.Color.Blue.$clone();
                snake.AddComponent(SpineEngine.ECS.Components.SpriteComponent).Drawable = new SpineEngine.Graphics.Drawable.SubtextureDrawable.$ctor2(SpineEngine.Graphics.Graphic.PixelTexture, 0, 0, 1, 1);
                snake.AddComponent(MyONez.Base.Screens.SnakeComponent);
                snake.AddComponent(SpineEngine.ECS.Components.InputKeyboardComponent);
                var botJoystick = new SpineEngine.ECS.EntitySystems.VirtualInput.VirtualJoystick.SettableValue();
                snake.AddComponent(SpineEngine.ECS.Components.InputVirtualComponent).InputConfiguration.add(new SpineEngine.ECS.EntitySystems.VirtualInput.VirtualJoystick.$ctor1(SpineEngine.ECS.EntitySystems.VirtualInput.VirtualInput.OverlapBehavior.TakeNewer, false, [botJoystick]));
                snake.AddComponent(MyONez.Base.AdditionalStuff.BrainAI.Components.AIComponent).AIBot = new (BrainAI.AI.FSM.StateMachine$1(MyONez.Base.Screens.MapComponent))(map, new MyONez.Base.Screens.AIScene.SnakeBotState(snake, this, botJoystick));
                snake.AddComponent$1(MyONez.Base.AdditionalStuff.Common.Components.FollowCameraComponent, new MyONez.Base.AdditionalStuff.Common.Components.FollowCameraComponent(this.Camera));

                var arrow = this.CreateEntity("arrow");
                arrow.AddComponent$1(SpineEngine.ECS.Components.ParentComponent, new SpineEngine.ECS.Components.ParentComponent.$ctor1(snake));
                arrow.AddComponent(SpineEngine.ECS.Components.SpriteComponent).Drawable = ($t = new SpineEngine.Graphics.Drawable.PrimitiveDrawable(Microsoft.Xna.Framework.Color.Yellow.$clone()), $t.Origin = new Microsoft.Xna.Framework.Vector2.$ctor2(1, 0), $t);
                arrow.AddComponent(SpineEngine.ECS.Components.ScaleComponent).Scale = new Microsoft.Xna.Framework.Vector2.$ctor2(2, 0.1);
                arrow.AddComponent(SpineEngine.ECS.Components.RotateComponent);
                arrow.AddComponent(MyONez.Base.Screens.ArrowComponent);

                this.ReLocateFood(map, food);

                this.AddEntitySystem(new MyONez.Base.Screens.MapGeneratorSystem());
                this.AddEntitySystem(new MyONez.Base.AdditionalStuff.BrainAI.EntitySystems.AIUpdateSystem());
                this.AddEntitySystem(new MyONez.Base.Screens.SnakeControlSystem());
                this.AddEntitySystem(new MyONez.Base.Screens.SnakeMoveSystem());
                this.AddEntitySystem(new MyONez.Base.Screens.SnakeGameOverSystem(map));
                this.AddEntitySystem(new MyONez.Base.Screens.SnakeArrowUpdateSystem(food));
                this.AddEntitySystem(new MyONez.Base.AdditionalStuff.Common.EntitySystems.FollowCameraUpdateSystem());
                this.AddEntitySystem(new MyONez.Base.Screens.SnakeFoodUpdateSystem(this, food, map));

                this.AddEntitySystemExecutionOrder(MyONez.Base.AdditionalStuff.BrainAI.EntitySystems.AIUpdateSystem, SpineEngine.ECS.EntitySystems.InputVirtualUpdateSystem);
                this.AddEntitySystemExecutionOrder(SpineEngine.ECS.EntitySystems.InputVirtualUpdateSystem, MyONez.Base.Screens.SnakeControlSystem);
                this.AddEntitySystemExecutionOrder(MyONez.Base.Screens.SnakeControlSystem, MyONez.Base.Screens.SnakeMoveSystem);
                this.AddEntitySystemExecutionOrder(MyONez.Base.Screens.SnakeMoveSystem, MyONez.Base.Screens.SnakeGameOverSystem);
                this.AddEntitySystemExecutionOrder(MyONez.Base.Screens.SnakeMoveSystem, MyONez.Base.Screens.SnakeFoodUpdateSystem);
                this.AddEntitySystemExecutionOrder(MyONez.Base.Screens.SnakeMoveSystem, MyONez.Base.AdditionalStuff.Common.EntitySystems.FollowCameraUpdateSystem);
                this.AddEntitySystemExecutionOrder(MyONez.Base.Screens.SnakeMoveSystem, MyONez.Base.Screens.SnakeArrowUpdateSystem);
            }
        },
        methods: {
            ReLocateFood: function (map, food) {
                var x = (FateRandom.Fate.GlobalFate.NextInt(((map.Map.Width - 2) | 0)) + 1) | 0;
                var y = (FateRandom.Fate.GlobalFate.NextInt(((map.Map.Height - 2) | 0)) + 1) | 0;
                while (map.Map.Walls.contains(new BrainAI.Pathfinding.Point.$ctor1(x, y))) {
                    x = (FateRandom.Fate.GlobalFate.NextInt(((map.Map.Width - 2) | 0)) + 1) | 0;
                    y = (FateRandom.Fate.GlobalFate.NextInt(((map.Map.Height - 2) | 0)) + 1) | 0;
                }

                food.GetComponent(SpineEngine.ECS.Components.PositionComponent).Position = new Microsoft.Xna.Framework.Vector2.$ctor2(x, y);
            },
            AddWall: function (map) {
                var x = (FateRandom.Fate.GlobalFate.NextInt(((map.Map.Width - 2) | 0)) + 1) | 0;
                var y = (FateRandom.Fate.GlobalFate.NextInt(((map.Map.Height - 2) | 0)) + 1) | 0;
                while (map.Map.Walls.contains(new BrainAI.Pathfinding.Point.$ctor1(x, y))) {
                    x = (FateRandom.Fate.GlobalFate.NextInt(((map.Map.Width - 2) | 0)) + 1) | 0;
                    y = (FateRandom.Fate.GlobalFate.NextInt(((map.Map.Height - 2) | 0)) + 1) | 0;
                }
                map.Map.Walls.add(new BrainAI.Pathfinding.Point.$ctor1(x, y));
            }
        }
    });

    Bridge.define("MyONez.Base.Screens.AIScene.SnakeBotState", {
        inherits: [BrainAI.AI.FSM.State$1(MyONez.Base.Screens.MapComponent)],
        $kind: "nested class",
        fields: {
            self: null,
            scene: null,
            food: null,
            control: null,
            knownFoodPosition: null,
            knownPath: null
        },
        ctors: {
            init: function () {
                this.knownFoodPosition = new Microsoft.Xna.Framework.Vector2();
            },
            ctor: function (self, scene, control) {
                this.$initialize();
                BrainAI.AI.FSM.State$1(MyONez.Base.Screens.MapComponent).ctor.call(this);
                this.self = self;
                this.scene = scene;
                this.food = scene.FindEntity("Food");
                this.control = control;
            }
        },
        methods: {
            Update: function () {
                var position = this.self.GetComponent(SpineEngine.ECS.Components.PositionComponent).Position.$clone();
                var foodPosition = this.food.GetComponent(SpineEngine.ECS.Components.PositionComponent).Position.$clone();

                if (Microsoft.Xna.Framework.Vector2.op_Inequality(foodPosition.$clone(), this.knownFoodPosition.$clone())) {
                    this.knownFoodPosition = foodPosition.$clone();
                    this.knownPath = BrainAI.Pathfinding.AStar.AStarPathfinder.Search$1(BrainAI.Pathfinding.Point, this.Context.Map, new BrainAI.Pathfinding.Point.$ctor1(Bridge.Int.clip32(position.X), Bridge.Int.clip32(position.Y)), new BrainAI.Pathfinding.Point.$ctor1(Bridge.Int.clip32(foodPosition.X), Bridge.Int.clip32(foodPosition.Y)));
                }

                if (this.knownPath == null) {
                    this.self.RemoveComponent$1(MyONez.Base.AdditionalStuff.BrainAI.Components.AIComponent);
                    this.self.RemoveComponent$1(MyONez.Base.Screens.SnakeComponent);
                    this.scene.Camera.RawZoom = 6;
                    this.control.JoysticValue = Microsoft.Xna.Framework.Vector2.Zero.$clone();
                    return;
                }

                if (position.X === this.knownPath.getItem(0).$clone().X && position.Y === this.knownPath.getItem(0).$clone().Y) {
                    this.knownPath.removeAt(0);
                }

                this.control.JoysticValue = new Microsoft.Xna.Framework.Vector2.$ctor2(this.knownPath.getItem(0).$clone().X - position.X, this.knownPath.getItem(0).$clone().Y - position.Y);
            }
        }
    });

    /** @namespace MyONez.Base.Screens */

    /**
     * Tiled map import that includes animated tiles from multiple different tileset images
     *
     * @public
     * @class MyONez.Base.Screens.AnimatedTilesScene
     * @augments MyONez.Base.Screens.BaseScene
     */
    Bridge.define("MyONez.Base.Screens.AnimatedTilesScene", {
        inherits: [MyONez.Base.Screens.BaseScene],
        ctors: {
            ctor: function () {
                this.$initialize();
                MyONez.Base.Screens.BaseScene.ctor.call(this);
                this.AddRenderer(SpineEngine.Graphics.Renderers.DefaultRenderer, new SpineEngine.Graphics.Renderers.DefaultRenderer());
                // setup a pixel perfect screen that fits our map
                //this.SetDesignResolution( 256, 224, SceneResolutionPolicy.ShowAllPixelPerfect );
                //Core.Instance.Screen.SetSize( 256 * 4, 224 * 4 );

                // load the TiledMap and display it with a TiledMapComponent
                var tiledEntity = this.CreateEntity("tiled-map-entity");
                var tiledmap = this.Content.Load(MyONez.Base.AdditionalStuff.TiledMap.Models.TiledMap, MyONez.Base.ContentPaths.AnimatedTiles.desertpalace);
                tiledEntity.AddComponent$1(MyONez.Base.AdditionalStuff.TiledMap.ECS.Components.TiledMapComponent, new MyONez.Base.AdditionalStuff.TiledMap.ECS.Components.TiledMapComponent(tiledmap));
                tiledEntity.AddComponent$1(SpineEngine.ECS.Components.ScaleComponent, new SpineEngine.ECS.Components.ScaleComponent.ctor()).Scale = new Microsoft.Xna.Framework.Vector2.$ctor2(2, 2);

                this.AddEntitySystem(new MyONez.Base.AdditionalStuff.TiledMap.ECS.EntitySystems.TiledMapUpdateSystem());
                this.AddEntitySystem(new MyONez.Base.AdditionalStuff.TiledMap.ECS.EntitySystems.TiledMapMeshGeneratorSystem(this));
            }
        }
    });

    Bridge.define("MyONez.Base.Screens.BasicScene", {
        inherits: [MyONez.Base.Screens.BaseScene],
        ctors: {
            ctor: function () {
                this.$initialize();
                MyONez.Base.Screens.BaseScene.ctor.call(this);
                this.SetDesignResolution(1280, 720, SpineEngine.Graphics.ResolutionPolicy.SceneResolutionPolicy.None);
                SpineEngine.Core.Instance.Screen.SetSize(1280, 720);

                this.AddRenderer(SpineEngine.Graphics.Renderers.RenderLayerExcludeRenderer, new SpineEngine.Graphics.Renderers.RenderLayerExcludeRenderer([MyONez.Base.Screens.BaseScene.ScreenSpaceRenderLayer]));

                var moonTex = this.Content.Load(Microsoft.Xna.Framework.Graphics.Texture2D, MyONez.Base.ContentPaths.Basic.moon);
                var playerEntity = this.CreateEntity();
                playerEntity.AddComponent(SpineEngine.ECS.Components.PositionComponent).Position = SpineEngine.Core.Instance.Screen.Center.$clone();
                playerEntity.AddComponent(SpineEngine.ECS.Components.RotateComponent).Rotation = 0.1;
                playerEntity.AddComponent(SpineEngine.ECS.Components.ScaleComponent).Scale = new Microsoft.Xna.Framework.Vector2.$ctor2(0.5, 1);
                playerEntity.AddComponent$1(SpineEngine.ECS.Components.SpriteComponent, new SpineEngine.ECS.Components.SpriteComponent.$ctor2(moonTex));

                playerEntity = this.CreateEntity();
                playerEntity.AddComponent(SpineEngine.ECS.Components.PositionComponent).Position = SpineEngine.Core.Instance.Screen.Center.$clone();
                playerEntity.AddComponent$1(SpineEngine.ECS.Components.SpriteComponent, new SpineEngine.ECS.Components.SpriteComponent.$ctor2(moonTex));
                playerEntity.AddComponent(SpineEngine.ECS.Components.RenderOrderComponent).Order = -1;
            }
        }
    });

    Bridge.define("MyONez.Base.Screens.EffectsScene", {
        inherits: [MyONez.Base.Screens.BaseScene],
        ctors: {
            ctor: function () {
                var $t, $t1;
                this.$initialize();
                MyONez.Base.Screens.BaseScene.ctor.call(this);
                this.SetDesignResolution(1280, 720, SpineEngine.Graphics.ResolutionPolicy.SceneResolutionPolicy.None);
                SpineEngine.Core.Instance.Screen.SetSize(1280, 720);

                var reflectionRenderer = ($t = new SpineEngine.Graphics.Renderers.RenderLayerRenderer([0]), $t.RenderTargetClearColor = Microsoft.Xna.Framework.Color.Transparent.$clone(), $t.RenderTexture = new SpineEngine.Graphics.RenderTexture.$ctor2(1, 1), $t.RenderOrder = -1, $t);

                this.AddRenderer(SpineEngine.Graphics.Renderers.RenderLayerRenderer, reflectionRenderer);
                this.AddRenderer(SpineEngine.Graphics.Renderers.RenderLayerRenderer, new SpineEngine.Graphics.Renderers.RenderLayerRenderer([1]));

                var moonTex = this.Content.Load(Microsoft.Xna.Framework.Graphics.Texture2D, MyONez.Base.ContentPaths.Basic.moon);
                var playerEntity = this.CreateEntity("original");
                playerEntity.AddComponent(SpineEngine.ECS.Components.PositionComponent).Position = new Microsoft.Xna.Framework.Vector2.$ctor2(((Bridge.Int.div(moonTex.Width, 2)) | 0), ((Bridge.Int.div(moonTex.Height, 2)) | 0));
                playerEntity.AddComponent$1(SpineEngine.ECS.Components.SpriteComponent, new SpineEngine.ECS.Components.SpriteComponent.$ctor2(moonTex));
                playerEntity.AddComponent$1(SpineEngine.ECS.Components.RenderOrderComponent, new SpineEngine.ECS.Components.RenderOrderComponent.ctor()).Order = -1;

                var primitiveDrawable = new SpineEngine.Graphics.Drawable.PrimitiveDrawable(Microsoft.Xna.Framework.Color.Black.$clone());

                var border = this.CreateEntity();
                border.AddComponent(SpineEngine.ECS.Components.ScaleComponent).Scale = new Microsoft.Xna.Framework.Vector2.$ctor2(moonTex.Width, 4);
                border.AddComponent(SpineEngine.ECS.Components.PositionComponent).Position = new Microsoft.Xna.Framework.Vector2.$ctor2(((Bridge.Int.div(moonTex.Width, 2)) | 0), 2);
                border.AddComponent(SpineEngine.ECS.Components.SpriteComponent).Drawable = primitiveDrawable;

                border = this.CreateEntity();
                border.AddComponent(SpineEngine.ECS.Components.ScaleComponent).Scale = new Microsoft.Xna.Framework.Vector2.$ctor2(moonTex.Width, 4);
                border.AddComponent(SpineEngine.ECS.Components.PositionComponent).Position = new Microsoft.Xna.Framework.Vector2.$ctor2(((Bridge.Int.div(moonTex.Width, 2)) | 0), ((moonTex.Height - 2) | 0));
                border.AddComponent(SpineEngine.ECS.Components.SpriteComponent).Drawable = primitiveDrawable;

                border = this.CreateEntity();
                border.AddComponent(SpineEngine.ECS.Components.ScaleComponent).Scale = new Microsoft.Xna.Framework.Vector2.$ctor2(4, moonTex.Height);
                border.AddComponent(SpineEngine.ECS.Components.PositionComponent).Position = new Microsoft.Xna.Framework.Vector2.$ctor2(2, ((Bridge.Int.div(moonTex.Height, 2)) | 0));
                border.AddComponent(SpineEngine.ECS.Components.SpriteComponent).Drawable = primitiveDrawable;

                border = this.CreateEntity();
                border.AddComponent(SpineEngine.ECS.Components.ScaleComponent).Scale = new Microsoft.Xna.Framework.Vector2.$ctor2(4, moonTex.Height);
                border.AddComponent(SpineEngine.ECS.Components.PositionComponent).Position = new Microsoft.Xna.Framework.Vector2.$ctor2(((moonTex.Width - 2) | 0), ((Bridge.Int.div(moonTex.Height, 2)) | 0));
                border.AddComponent(SpineEngine.ECS.Components.SpriteComponent).Drawable = primitiveDrawable;


                var drawable = new SpineEngine.Graphics.Drawable.SubtextureDrawable.$ctor7(reflectionRenderer.RenderTexture, 0, 0, moonTex.Width, moonTex.Height);

                var tv = this.CreateEntity();
                tv.AddComponent(SpineEngine.ECS.Components.SpriteComponent).Drawable = drawable;
                tv.AddComponent(SpineEngine.ECS.Components.PositionComponent).Position = new Microsoft.Xna.Framework.Vector2.$ctor2(((((Bridge.Int.div(moonTex.Width, 2)) | 0) + 5) | 0), ((((Bridge.Int.div(moonTex.Height, 2)) | 0) + 5) | 0));
                tv.AddComponent(SpineEngine.ECS.Components.RenderLayerComponent).Layer = 1;

                var startx = 1;
                var starty = 0;

                $t = Bridge.getEnumerator(this.GetEffects(), Microsoft.Xna.Framework.Graphics.Effect);
                try {
                    while ($t.moveNext()) {
                        var effect = $t.Current;
                        tv = this.CreateEntity();
                        tv.AddComponent(SpineEngine.ECS.Components.SpriteComponent).Drawable = drawable;
                        tv.AddComponent(SpineEngine.ECS.Components.PositionComponent).Position = new Microsoft.Xna.Framework.Vector2.$ctor2(((((((Bridge.Int.div(moonTex.Width, 2)) | 0) + 5) | 0) + Bridge.Int.mul(startx, 150)) | 0), ((((((Bridge.Int.div(moonTex.Height, 2)) | 0) + 5) | 0) + Bridge.Int.mul(starty, 200)) | 0));
                        tv.AddComponent(SpineEngine.ECS.Components.MaterialComponent).Material = ($t1 = new SpineEngine.Graphics.Materials.Material(), $t1.Effect = effect, $t1);
                        tv.AddComponent(SpineEngine.ECS.Components.RenderLayerComponent).Layer = 1;

                        startx = (startx + 1) | 0;
                        if (startx === 6) {
                            startx = 0;
                            starty = (starty + 1) | 0;
                        }
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }
            }
        },
        methods: {
            GetEffects: function () {
                return new (Bridge.GeneratorEnumerable$1(Microsoft.Xna.Framework.Graphics.Effect))(Bridge.fn.bind(this, function ()  {
                    var $step = 0,
                        $jumpFromFinally,
                        $returnValue,
                        heatDistortionEffect,
                        letterboxEffect,
                        pixelGlitchEffect,
                        squaresEffect,
                        textureWipeEffect,
                        vignetteEffect,
                        windEffect,
                        $async_e;

                    var $enumerator = new (Bridge.GeneratorEnumerator$1(Microsoft.Xna.Framework.Graphics.Effect))(Bridge.fn.bind(this, function () {
                        try {
                            for (;;) {
                                switch ($step) {
                                    case 0: {
                                        $enumerator.current = this.Content.Load(MyONez.Base.AdditionalStuff.Effects.BevelsEffect, MyONez.Base.AdditionalStuff.Effects.BevelsEffect.EffectAssetName);
                                            $step = 1;
                                            return true;
                                    }
                                    case 1: {
                                        //yield return this.Content.Load<BloomCombineEffect>(BloomCombineEffect.EffectAssetName);
                                            //yield return this.Content.Load<BloomExtractEffect>(BloomExtractEffect.EffectAssetName);
                                            $enumerator.current = this.Content.Load(MyONez.Base.AdditionalStuff.Effects.CrosshatchEffect, MyONez.Base.AdditionalStuff.Effects.CrosshatchEffect.EffectAssetName);
                                            $step = 2;
                                            return true;
                                    }
                                    case 2: {
                                        //yield return this.Content.Load<DeferredLightingEffect>(DeferredLightingEffect.EffectAssetName);
                                            //yield return this.Content.Load<DeferredSpriteEffect>(DeferredSpriteEffect.EffectAssetName);
                                            //yield return this.Content.Load<DissolveEffect>(DissolveEffect.EffectAssetName);
                                            $enumerator.current = this.Content.Load(MyONez.Base.AdditionalStuff.Effects.DotsEffect, MyONez.Base.AdditionalStuff.Effects.DotsEffect.EffectAssetName);
                                            $step = 3;
                                            return true;
                                    }
                                    case 3: {
                                        //yield return this.Content.Load<ForwardLightingEffect>(ForwardLightingEffect.EffectAssetName);
                                            //yield return this.Content.Load<GaussianBlurEffect>(GaussianBlurEffect.EffectAssetName);
                                            $enumerator.current = this.Content.Load(MyONez.Base.AdditionalStuff.Effects.GrayscaleEffect, MyONez.Base.AdditionalStuff.Effects.GrayscaleEffect.EffectAssetName);
                                            $step = 4;
                                            return true;
                                    }
                                    case 4: {
                                        heatDistortionEffect = this.Content.Load(MyONez.Base.AdditionalStuff.Effects.HeatDistortionEffect, MyONez.Base.AdditionalStuff.Effects.HeatDistortionEffect.EffectAssetName);
                                            heatDistortionEffect.DistortionFactor = 0.02;
                                            heatDistortionEffect.RiseFactor = 0.5;
                                            heatDistortionEffect.DistortionTexture = this.Content.Load(Microsoft.Xna.Framework.Graphics.Texture2D, MyONez.Base.ContentPaths.Textures.heatDistortionNoise);
                                            $enumerator.current = heatDistortionEffect;
                                            $step = 5;
                                            return true;
                                    }
                                    case 5: {
                                        $enumerator.current = this.Content.Load(MyONez.Base.AdditionalStuff.Effects.InvertEffect, MyONez.Base.AdditionalStuff.Effects.InvertEffect.EffectAssetName);
                                            $step = 6;
                                            return true;
                                    }
                                    case 6: {
                                        letterboxEffect = this.Content.Load(MyONez.Base.AdditionalStuff.Effects.LetterboxEffect, MyONez.Base.AdditionalStuff.Effects.LetterboxEffect.EffectAssetName);
                                            letterboxEffect.Color = Microsoft.Xna.Framework.Color.Black.$clone();
                                            letterboxEffect.LetterboxSize = 50;
                                            $enumerator.current = letterboxEffect;
                                            $step = 7;
                                            return true;
                                    }
                                    case 7: {
                                        //yield return this.Content.Load<MultiTextureEffect>(MultiTextureEffect.EffectAssetName);
                                            $enumerator.current = this.Content.Load(MyONez.Base.AdditionalStuff.Effects.MultiTextureOverlayEffect, MyONez.Base.AdditionalStuff.Effects.MultiTextureOverlayEffect.EffectAssetName);
                                            $step = 8;
                                            return true;
                                    }
                                    case 8: {
                                        $enumerator.current = this.Content.Load(MyONez.Base.AdditionalStuff.Effects.NoiseEffect, MyONez.Base.AdditionalStuff.Effects.NoiseEffect.EffectAssetName);
                                            $step = 9;
                                            return true;
                                    }
                                    case 9: {
                                        //yield return this.Content.Load<PaletteCyclerEffect>(PaletteCyclerEffect.EffectAssetName);
                                            pixelGlitchEffect = this.Content.Load(MyONez.Base.AdditionalStuff.Effects.PixelGlitchEffect, MyONez.Base.AdditionalStuff.Effects.PixelGlitchEffect.EffectAssetName);
                                            pixelGlitchEffect.VerticalSize = 1;
                                            pixelGlitchEffect.HorizontalOffset = 1;
                                            pixelGlitchEffect.ScreenSize = new Microsoft.Xna.Framework.Vector2.$ctor2(128, 128);
                                            $enumerator.current = pixelGlitchEffect;
                                            $step = 10;
                                            return true;
                                    }
                                    case 10: {
                                        //yield return this.Content.Load<PolygonLightEffect>(PolygonLightEffect.EffectAssetName);
                                            //yield return this.Content.Load<ReflectionEffect>(ScanlinesEffect.EffectAssetName);
                                            $enumerator.current = this.Content.Load(MyONez.Base.AdditionalStuff.Effects.ScanlinesEffect, MyONez.Base.AdditionalStuff.Effects.ScanlinesEffect.EffectAssetName);
                                            $step = 11;
                                            return true;
                                    }
                                    case 11: {
                                        $enumerator.current = this.Content.Load(MyONez.Base.AdditionalStuff.Effects.SepiaEffect, MyONez.Base.AdditionalStuff.Effects.SepiaEffect.EffectAssetName);
                                            $step = 12;
                                            return true;
                                    }
                                    case 12: {
                                        //yield return this.Content.Load<SpriteAlphaTestEffect>(SpriteAlphaTestEffect.EffectAssetName);
                                            //yield return this.Content.Load<SpriteBlinkEffect>(SpriteBlinkEffect.EffectAssetName);
                                            //yield return this.Content.Load<SpriteLightMultiplyEffect>(SpriteLightMultiplyEffect.EffectAssetName);
                                            $enumerator.current = this.Content.Load(MyONez.Base.AdditionalStuff.Effects.SpriteLinesEffect, MyONez.Base.AdditionalStuff.Effects.SpriteLinesEffect.EffectAssetName);
                                            $step = 13;
                                            return true;
                                    }
                                    case 13: {
                                        squaresEffect = this.Content.Load(MyONez.Base.AdditionalStuff.Effects.SquaresEffect, MyONez.Base.AdditionalStuff.Effects.SquaresEffect.EffectAssetName);
                                            squaresEffect.Color = Microsoft.Xna.Framework.Color.Transparent.$clone();
                                            squaresEffect.Progress = 0.6;
                                            $enumerator.current = squaresEffect;
                                            $step = 14;
                                            return true;
                                    }
                                    case 14: {
                                        textureWipeEffect = this.Content.Load(MyONez.Base.AdditionalStuff.Effects.TextureWipeEffect, MyONez.Base.AdditionalStuff.Effects.TextureWipeEffect.EffectAssetName);
                                            textureWipeEffect.Opacity = 1;
                                            textureWipeEffect.Texture = this.Content.Load(Microsoft.Xna.Framework.Graphics.Texture2D, MyONez.Base.ContentPaths.Textures.TextureWipeTransition.angular);
                                            textureWipeEffect.Progress = 0.01;
                                            $enumerator.current = textureWipeEffect;
                                            $step = 15;
                                            return true;
                                    }
                                    case 15: {
                                        //yield return this.Content.Load<TwistEffect>(TwistEffect.EffectAssetName);
                                            vignetteEffect = this.Content.Load(MyONez.Base.AdditionalStuff.Effects.VignetteEffect, MyONez.Base.AdditionalStuff.Effects.VignetteEffect.EffectAssetName);
                                            vignetteEffect.Power = 1;
                                            vignetteEffect.Radius = 1;
                                            $enumerator.current = vignetteEffect;
                                            $step = 16;
                                            return true;
                                    }
                                    case 16: {
                                        windEffect = this.Content.Load(MyONez.Base.AdditionalStuff.Effects.WindEffect, MyONez.Base.AdditionalStuff.Effects.WindEffect.EffectAssetName);
                                            windEffect.Progress = 0.1;
                                            windEffect.Size = 0.1;
                                            windEffect.Segments = 1000;
                                            $enumerator.current = windEffect;
                                            $step = 17;
                                            return true;
                                    }
                                    case 17: {

                                    }
                                    default: {
                                        return false;
                                    }
                                }
                            }
                        } catch($async_e1) {
                            $async_e = System.Exception.create($async_e1);
                            throw $async_e;
                        }
                    }));
                    return $enumerator;
                }));
            }
        }
    });

    Bridge.define("MyONez.Base.Screens.RenderProcessorScene", {
        inherits: [MyONez.Base.Screens.BaseScene],
        ctors: {
            ctor: function () {
                var $t;
                this.$initialize();
                MyONez.Base.Screens.BaseScene.ctor.call(this);
                this.SetDesignResolution(1280, 720, SpineEngine.Graphics.ResolutionPolicy.SceneResolutionPolicy.BestFit);
                SpineEngine.Core.Instance.Screen.SetSize(1280, 720);

                this.AddRenderer(SpineEngine.Graphics.Renderers.RenderLayerExcludeRenderer, new SpineEngine.Graphics.Renderers.RenderLayerExcludeRenderer([MyONez.Base.Screens.BaseScene.ScreenSpaceRenderLayer]));

                var entity = this.CreateEntity("ui");
                var ui = entity.AddComponent(MyONez.Base.AdditionalStuff.FaceUI.ECS.Components.UIComponent).UserInterface;
                var panel = new FaceUI.Entities.Panel.$ctor1(new Microsoft.Xna.Framework.Vector2.$ctor2(600, -1), FaceUI.Entities.PanelSkin.None);
                ui.AddEntity(panel);
                $t = Bridge.getEnumerator(this.GetPostProcessors(), SpineEngine.Graphics.RenderProcessors.RenderProcessor);
                try {
                    while ($t.moveNext()) {
                        var renderProcessor = { v : $t.Current };
                        var checkBox = { v : new FaceUI.Entities.CheckBox.$ctor1(Bridge.Reflection.getTypeName(Bridge.getType(renderProcessor.v))) };
                        panel.AddChild(checkBox.v);
                        checkBox.v.OnClick = Bridge.fn.combine(checkBox.v.OnClick, (function ($me, checkBox, renderProcessor) {
                            return Bridge.fn.bind($me, function (butt) {
                                if (checkBox.v.Checked) {
                                    this.AddRenderProcessor(SpineEngine.Graphics.RenderProcessors.RenderProcessor, renderProcessor.v);
                                } else {
                                    this.RemoveRenderProcessor(renderProcessor.v);
                                }
                            });
                        })(this, checkBox, renderProcessor));
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }
            }
        },
        methods: {
            GetPostProcessors: function () {
                return new (Bridge.GeneratorEnumerable$1(SpineEngine.Graphics.RenderProcessors.RenderProcessor))(Bridge.fn.bind(this, function ()  {
                    var $step = 0,
                        $jumpFromFinally,
                        $returnValue,
                        $async_e;

                    var $enumerator = new (Bridge.GeneratorEnumerator$1(SpineEngine.Graphics.RenderProcessors.RenderProcessor))(Bridge.fn.bind(this, function () {
                        try {
                            for (;;) {
                                switch ($step) {
                                    case 0: {
                                        $enumerator.current = new MyONez.Base.AdditionalStuff.RenderProcessors.BloomRenderProcessor(1);
                                            $step = 1;
                                            return true;
                                    }
                                    case 1: {
                                        $enumerator.current = new MyONez.Base.AdditionalStuff.RenderProcessors.GaussianBlurRenderProcessor(1);
                                            $step = 2;
                                            return true;
                                    }
                                    case 2: {
                                        $enumerator.current = new MyONez.Base.AdditionalStuff.RenderProcessors.HeatDistortionRenderProcessor(1);
                                            $step = 3;
                                            return true;
                                    }
                                    case 3: {
                                        $enumerator.current = new MyONez.Base.AdditionalStuff.RenderProcessors.PixelGlitchRenderProcessor(1);
                                            $step = 4;
                                            return true;
                                    }
                                    case 4: {
                                        $enumerator.current = new MyONez.Base.AdditionalStuff.RenderProcessors.PixelMosaicRenderProcessor(1);
                                            $step = 5;
                                            return true;
                                    }
                                    case 5: {
                                        $enumerator.current = new MyONez.Base.AdditionalStuff.RenderProcessors.ScanlinesRenderProcessor(1);
                                            $step = 6;
                                            return true;
                                    }
                                    case 6: {
                                        $enumerator.current = new MyONez.Base.AdditionalStuff.RenderProcessors.VignetteRenderProcessor(1);
                                            $step = 7;
                                            return true;
                                    }
                                    case 7: {

                                    }
                                    default: {
                                        return false;
                                    }
                                }
                            }
                        } catch($async_e1) {
                            $async_e = System.Exception.create($async_e1);
                            throw $async_e;
                        }
                    }));
                    return $enumerator;
                }));
            }
        }
    });

    Bridge.define("MyONez.Base.Screens.ResolutionPoliciesScene", {
        inherits: [MyONez.Base.Screens.BaseScene],
        ctors: {
            ctor: function () {
                var $t, $t1;
                this.$initialize();
                MyONez.Base.Screens.BaseScene.ctor.call(this);
                this.SetDesignResolution(800, 800, SpineEngine.Graphics.ResolutionPolicy.SceneResolutionPolicy.BestFit);
                SpineEngine.Core.Instance.Screen.SetSize(800, 800);

                this.AddRenderer(SpineEngine.Graphics.Renderers.RenderLayerExcludeRenderer, new SpineEngine.Graphics.Renderers.RenderLayerExcludeRenderer([MyONez.Base.Screens.BaseScene.ScreenSpaceRenderLayer]));

                var moonTex = this.Content.Load(Microsoft.Xna.Framework.Graphics.Texture2D, MyONez.Base.ContentPaths.Basic.moon);
                var playerEntity = this.CreateEntity("player");
                playerEntity.AddComponent(SpineEngine.ECS.Components.PositionComponent).Position = Microsoft.Xna.Framework.Vector2.op_Addition(SpineEngine.Core.Instance.Screen.Center.$clone(), new Microsoft.Xna.Framework.Vector2.$ctor2(0, 200));
                playerEntity.AddComponent$1(SpineEngine.ECS.Components.SpriteComponent, new SpineEngine.ECS.Components.SpriteComponent.$ctor2(moonTex));
                playerEntity.AddComponent$1(SpineEngine.ECS.Components.ScaleComponent, new SpineEngine.ECS.Components.ScaleComponent.ctor()).Scale = Microsoft.Xna.Framework.Vector2.op_Multiply$1(Microsoft.Xna.Framework.Vector2.One.$clone(), 0.7);

                var entity = this.CreateEntity("ui");
                entity.AddComponent$1(SpineEngine.ECS.Components.ScaleComponent, new SpineEngine.ECS.Components.ScaleComponent.ctor()).Scale = Microsoft.Xna.Framework.Vector2.op_Multiply$1(Microsoft.Xna.Framework.Vector2.One.$clone(), 0.7);
                var ui = entity.AddComponent(MyONez.Base.AdditionalStuff.FaceUI.ECS.Components.UIComponent).UserInterface;
                var panel = new FaceUI.Entities.Panel.$ctor1(new Microsoft.Xna.Framework.Vector2.$ctor2(500, -1), FaceUI.Entities.PanelSkin.None);
                ui.AddEntity(panel);
                var dropDown = new FaceUI.Entities.DropDown.ctor();
                panel.AddChild(dropDown);
                var dict = System.Linq.Enumerable.from(this.GetResolutionPolicies()).toDictionary($asm.$.MyONez.Base.Screens.ResolutionPoliciesScene.f1, $asm.$.MyONez.Base.Screens.ResolutionPoliciesScene.f2, System.String, SpineEngine.Graphics.ResolutionPolicy.SceneResolutionPolicy);
                $t = Bridge.getEnumerator(dict);
                try {
                    while ($t.moveNext()) {
                        var policy = $t.Current;
                        dropDown.AddItem(policy.key);
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }

                dropDown.SelectedValue = "BestFit";
                panel.AddChild(($t1 = new FaceUI.Entities.Button.$ctor1("Apply"), $t1.OnClick = Bridge.fn.bind(this, function (button) {
                    var policy1 = dict.get(dropDown.SelectedValue);
                    this.SetDesignResolution(800, 800, policy1);
                }), $t1));
                panel.AddChild(($t1 = new FaceUI.Entities.Button.$ctor1("Reset screen size"), $t1.OnClick = $asm.$.MyONez.Base.Screens.ResolutionPoliciesScene.f3, $t1));
            }
        },
        methods: {
            GetResolutionPolicies: function () {
                return new (Bridge.GeneratorEnumerable$1(System.ValueTuple$2(System.String,SpineEngine.Graphics.ResolutionPolicy.SceneResolutionPolicy)))(Bridge.fn.bind(this, function ()  {
                    var $step = 0,
                        $jumpFromFinally,
                        $returnValue,
                        $async_e;

                    var $enumerator = new (Bridge.GeneratorEnumerator$1(System.ValueTuple$2(System.String,SpineEngine.Graphics.ResolutionPolicy.SceneResolutionPolicy)))(Bridge.fn.bind(this, function () {
                        try {
                            for (;;) {
                                switch ($step) {
                                    case 0: {
                                        $enumerator.current = new (System.ValueTuple$2(System.String,SpineEngine.Graphics.ResolutionPolicy.SceneResolutionPolicy)).$ctor1("None", SpineEngine.Graphics.ResolutionPolicy.SceneResolutionPolicy.None);
                                            $step = 1;
                                            return true;
                                    }
                                    case 1: {
                                        $enumerator.current = new (System.ValueTuple$2(System.String,SpineEngine.Graphics.ResolutionPolicy.SceneResolutionPolicy)).$ctor1("Stretch", SpineEngine.Graphics.ResolutionPolicy.SceneResolutionPolicy.Stretch);
                                            $step = 2;
                                            return true;
                                    }
                                    case 2: {
                                        $enumerator.current = new (System.ValueTuple$2(System.String,SpineEngine.Graphics.ResolutionPolicy.SceneResolutionPolicy)).$ctor1("ExactFit", SpineEngine.Graphics.ResolutionPolicy.SceneResolutionPolicy.ExactFit);
                                            $step = 3;
                                            return true;
                                    }
                                    case 3: {
                                        $enumerator.current = new (System.ValueTuple$2(System.String,SpineEngine.Graphics.ResolutionPolicy.SceneResolutionPolicy)).$ctor1("NoBorder", SpineEngine.Graphics.ResolutionPolicy.SceneResolutionPolicy.NoBorder);
                                            $step = 4;
                                            return true;
                                    }
                                    case 4: {
                                        $enumerator.current = new (System.ValueTuple$2(System.String,SpineEngine.Graphics.ResolutionPolicy.SceneResolutionPolicy)).$ctor1("NoBorderPixelPerfect", SpineEngine.Graphics.ResolutionPolicy.SceneResolutionPolicy.NoBorderPixelPerfect);
                                            $step = 5;
                                            return true;
                                    }
                                    case 5: {
                                        $enumerator.current = new (System.ValueTuple$2(System.String,SpineEngine.Graphics.ResolutionPolicy.SceneResolutionPolicy)).$ctor1("ShowAll", SpineEngine.Graphics.ResolutionPolicy.SceneResolutionPolicy.ShowAll);
                                            $step = 6;
                                            return true;
                                    }
                                    case 6: {
                                        $enumerator.current = new (System.ValueTuple$2(System.String,SpineEngine.Graphics.ResolutionPolicy.SceneResolutionPolicy)).$ctor1("ShowAllPixelPerfect", SpineEngine.Graphics.ResolutionPolicy.SceneResolutionPolicy.ShowAllPixelPerfect);
                                            $step = 7;
                                            return true;
                                    }
                                    case 7: {
                                        $enumerator.current = new (System.ValueTuple$2(System.String,SpineEngine.Graphics.ResolutionPolicy.SceneResolutionPolicy)).$ctor1("FixedHeight", SpineEngine.Graphics.ResolutionPolicy.SceneResolutionPolicy.FixedHeight);
                                            $step = 8;
                                            return true;
                                    }
                                    case 8: {
                                        $enumerator.current = new (System.ValueTuple$2(System.String,SpineEngine.Graphics.ResolutionPolicy.SceneResolutionPolicy)).$ctor1("FixedHeightPixelPerfect", SpineEngine.Graphics.ResolutionPolicy.SceneResolutionPolicy.FixedHeightPixelPerfect);
                                            $step = 9;
                                            return true;
                                    }
                                    case 9: {
                                        $enumerator.current = new (System.ValueTuple$2(System.String,SpineEngine.Graphics.ResolutionPolicy.SceneResolutionPolicy)).$ctor1("FixedWidth", SpineEngine.Graphics.ResolutionPolicy.SceneResolutionPolicy.FixedWidth);
                                            $step = 10;
                                            return true;
                                    }
                                    case 10: {
                                        $enumerator.current = new (System.ValueTuple$2(System.String,SpineEngine.Graphics.ResolutionPolicy.SceneResolutionPolicy)).$ctor1("FixedWidthPixelPerfect", SpineEngine.Graphics.ResolutionPolicy.SceneResolutionPolicy.FixedWidthPixelPerfect);
                                            $step = 11;
                                            return true;
                                    }
                                    case 11: {
                                        Bridge.cast(SpineEngine.Graphics.ResolutionPolicy.SceneResolutionPolicy.BestFit, SpineEngine.Graphics.ResolutionPolicy.BestFitSceneResolutionPolicy).BleedSize = new Microsoft.Xna.Framework.Point.$ctor2(123, 321);
                                            $enumerator.current = new (System.ValueTuple$2(System.String,SpineEngine.Graphics.ResolutionPolicy.SceneResolutionPolicy)).$ctor1("BestFit", SpineEngine.Graphics.ResolutionPolicy.SceneResolutionPolicy.BestFit);
                                            $step = 12;
                                            return true;
                                    }
                                    case 12: {

                                    }
                                    default: {
                                        return false;
                                    }
                                }
                            }
                        } catch($async_e1) {
                            $async_e = System.Exception.create($async_e1);
                            throw $async_e;
                        }
                    }));
                    return $enumerator;
                }));
            }
        }
    });

    Bridge.ns("MyONez.Base.Screens.ResolutionPoliciesScene", $asm.$);

    Bridge.apply($asm.$.MyONez.Base.Screens.ResolutionPoliciesScene, {
        f1: function (a) {
            return a.Item1;
        },
        f2: function (a) {
            return a.Item2;
        },
        f3: function (button) {
            SpineEngine.Core.Instance.Screen.SetSize(800, 800);
        }
    });

    Bridge.define("MyONez.Base.Screens.SpriteLightsScene", {
        inherits: [MyONez.Base.Screens.BaseScene],
        statics: {
            fields: {
                SpriteLightRenderLayer: 0,
                UIRenderLayer: 0
            },
            ctors: {
                init: function () {
                    this.SpriteLightRenderLayer = 50;
                    this.UIRenderLayer = 1;
                }
            }
        },
        fields: {
            sceneUnloaded: false
        },
        ctors: {
            ctor: function () {
                this.$initialize();
                MyONez.Base.Screens.BaseScene.ctor.call(this);
                // setup screen that fits our map
                this.SetDesignResolution(1280, 720, SpineEngine.Graphics.ResolutionPolicy.SceneResolutionPolicy.ShowAll);
                SpineEngine.Core.Instance.Screen.SetSize(1280, 720);

                this.AddRenderer(SpineEngine.Graphics.Renderers.RenderLayerRenderer, new SpineEngine.Graphics.Renderers.RenderLayerRenderer([MyONez.Base.Screens.SpriteLightsScene.UIRenderLayer])).RenderAfterPostProcessors = true;
                this.AddRenderer(SpineEngine.Graphics.Renderers.RenderLayerExcludeRenderer, new SpineEngine.Graphics.Renderers.RenderLayerExcludeRenderer([MyONez.Base.Screens.SpriteLightsScene.SpriteLightRenderLayer]));
                var lightRenderer = this.AddRenderer(SpineEngine.Graphics.Renderers.RenderLayerRenderer, new SpineEngine.Graphics.Renderers.RenderLayerRenderer([MyONez.Base.Screens.SpriteLightsScene.SpriteLightRenderLayer]));
                lightRenderer.RenderTexture = new SpineEngine.Graphics.RenderTexture.ctor();
                lightRenderer.RenderTargetClearColor = Microsoft.Xna.Framework.Color.White.$clone();

                this.AddRenderProcessor(MyONez.Base.AdditionalStuff.RenderProcessors.SpriteLightRenderProcessor, new MyONez.Base.AdditionalStuff.RenderProcessors.SpriteLightRenderProcessor(0, lightRenderer.RenderTexture));
                this.AddRenderProcessor(MyONez.Base.AdditionalStuff.RenderProcessors.ScanlinesRenderProcessor, new MyONez.Base.AdditionalStuff.RenderProcessors.ScanlinesRenderProcessor(0));

                var bg = this.Content.Load(Microsoft.Xna.Framework.Graphics.Texture2D, MyONez.Base.ContentPaths.SpriteLights.bg);
                var bgEntity = this.CreateEntity("bg");
                bgEntity.AddComponent(SpineEngine.ECS.Components.PositionComponent).Position = SpineEngine.Core.Instance.Screen.Center.$clone();
                bgEntity.AddComponent$1(SpineEngine.ECS.Components.SpriteComponent, new SpineEngine.ECS.Components.SpriteComponent.$ctor2(bg));
                bgEntity.AddComponent(SpineEngine.ECS.Components.ScaleComponent).Scale = new Microsoft.Xna.Framework.Vector2.$ctor1(9.4);

                var moonTex = this.Content.Load(Microsoft.Xna.Framework.Graphics.Texture2D, MyONez.Base.ContentPaths.SpriteLights.moon);
                var entity = this.CreateEntity("moon");
                entity.AddComponent$1(SpineEngine.ECS.Components.SpriteComponent, new SpineEngine.ECS.Components.SpriteComponent.$ctor2(moonTex));
                entity.AddComponent(SpineEngine.ECS.Components.PositionComponent).Position = new Microsoft.Xna.Framework.Vector2.$ctor2(SpineEngine.Core.Instance.Screen.Width / 4.0, SpineEngine.Core.Instance.Screen.Height / 8.0);

                var lightTex = this.Content.Load(Microsoft.Xna.Framework.Graphics.Texture2D, MyONez.Base.ContentPaths.SpriteLights.spritelight);
                var pixelLightTex = this.Content.Load(Microsoft.Xna.Framework.Graphics.Texture2D, MyONez.Base.ContentPaths.SpriteLights.pixelspritelight);

                this.AddSpriteLight(lightTex, new Microsoft.Xna.Framework.Vector2.$ctor2(50, 50), 2);
                this.AddSpriteLight(lightTex, SpineEngine.Core.Instance.Screen.Center.$clone(), 3);
                this.AddSpriteLight(lightTex, new Microsoft.Xna.Framework.Vector2.$ctor2(((SpineEngine.Core.Instance.Screen.Width - 100) | 0), 150), 2);
                this.AddSpriteLight(pixelLightTex, Microsoft.Xna.Framework.Vector2.op_Addition(SpineEngine.Core.Instance.Screen.Center.$clone(), new Microsoft.Xna.Framework.Vector2.$ctor2(200, 10)), 10);
                this.AddSpriteLight(pixelLightTex, Microsoft.Xna.Framework.Vector2.op_Subtraction(SpineEngine.Core.Instance.Screen.Center.$clone(), new Microsoft.Xna.Framework.Vector2.$ctor2(200, 10)), 13);
                this.AddSpriteLight(pixelLightTex, Microsoft.Xna.Framework.Vector2.op_Addition(SpineEngine.Core.Instance.Screen.Center.$clone(), new Microsoft.Xna.Framework.Vector2.$ctor2(10, 200)), 8);
            }
        },
        methods: {
            AddSpriteLight: function (texture, position, scale) {
                // random target to tween towards that is on screen
                var target = new Microsoft.Xna.Framework.Vector2.$ctor2(FateRandom.Fate.GlobalFate.Range$1(50, ((this.SceneRenderTarget.Width - 100) | 0)), FateRandom.Fate.GlobalFate.Range$1(50, ((this.SceneRenderTarget.Height - 100) | 0)));

                var entity = this.CreateEntity();
                entity.AddComponent$1(SpineEngine.ECS.Components.SpriteComponent, new SpineEngine.ECS.Components.SpriteComponent.$ctor2(texture));
                var entityPos = entity.AddComponent(SpineEngine.ECS.Components.PositionComponent);
                entityPos.Position = position.$clone();
                entity.AddComponent(SpineEngine.ECS.Components.ScaleComponent).Scale = new Microsoft.Xna.Framework.Vector2.$ctor1(scale);
                entity.AddComponent(SpineEngine.ECS.Components.RenderLayerComponent).Layer = MyONez.Base.Screens.SpriteLightsScene.SpriteLightRenderLayer;

                if (FateRandom.Fate.GlobalFate.Chance(50)) {
                    entity.AddComponent(SpineEngine.ECS.Components.ColorComponent).Color = this.RandomColor();
                    var cycler = entity.AddComponent$1(MyONez.Base.AdditionalStuff.Common.Components.ColorCyclerComponent, new MyONez.Base.AdditionalStuff.Common.Components.ColorCyclerComponent());
                    cycler.WaveFunction = FateRandom.Fate.GlobalFate.Range$1(0, 5);
                    cycler.Offset = FateRandom.Fate.GlobalFate.NextFloat();
                    cycler.Frequency = FateRandom.Fate.GlobalFate.Range$2(0.6, 1.5);
                    cycler.Phase = FateRandom.Fate.GlobalFate.NextFloat();
                } else {
                    var tween = SpineEngine.GlobalManagers.Tweens.TweenExt.TweenTo$3(entityPos, target.$clone(), 2);
                    tween.SpineEngine$GlobalManagers$Tweens$Interfaces$ITween$1$Microsoft$Xna$Framework$Vector2$CompletionHandler = Bridge.fn.cacheBind(this, this.LightTweenCompleted);
                    SpineEngine.Core.Instance.GetGlobalManager(SpineEngine.GlobalManagers.Tweens.TweenGlobalManager).StartTween(tween);
                }
            },
            OnEnd: function () {
                this.sceneUnloaded = true;
                MyONez.Base.Screens.BaseScene.prototype.OnEnd.call(this);
            },
            LightTweenCompleted: function (tween) {
                if (this.sceneUnloaded) {
                    return;
                }

                // get a random point on screen and a random delay for the tweens
                var target = new Microsoft.Xna.Framework.Vector2.$ctor2(FateRandom.Fate.GlobalFate.Range$1(50, ((this.SceneRenderTarget.Width - 100) | 0)), FateRandom.Fate.GlobalFate.Range$1(50, ((this.SceneRenderTarget.Height - 100) | 0)));
                var delay = FateRandom.Fate.GlobalFate.Range$2(0.0, 1.0);

                var transform = Bridge.cast(tween.SpineEngine$GlobalManagers$Tweens$Interfaces$ITween$1$Microsoft$Xna$Framework$Vector2$Target, SpineEngine.ECS.Components.PositionComponent);
                var nextTween = SpineEngine.GlobalManagers.Tweens.TweenExt.TweenTo$3(transform, target.$clone(), 2);
                nextTween.SpineEngine$GlobalManagers$Tweens$Interfaces$ITween$1$Microsoft$Xna$Framework$Vector2$CompletionHandler = Bridge.fn.cacheBind(this, this.LightTweenCompleted);
                nextTween.SpineEngine$GlobalManagers$Tweens$Interfaces$ITween$Delay = delay;
                SpineEngine.Core.Instance.GetGlobalManager(SpineEngine.GlobalManagers.Tweens.TweenGlobalManager).StartTween(nextTween);

                // every so often add a scale tween
                if (FateRandom.Fate.GlobalFate.Chance(60)) {
                    var scale = transform.Entity.GetComponent(SpineEngine.ECS.Components.ScaleComponent);
                    var scaleTween = SpineEngine.GlobalManagers.Tweens.TweenExt.TweenTo$4(scale, Microsoft.Xna.Framework.Vector2.op_Multiply$1(scale.Scale.$clone(), 1.2), 1);
                    scaleTween.SpineEngine$GlobalManagers$Tweens$Interfaces$ITween$LoopType = SpineEngine.GlobalManagers.Tweens.LoopType.PingPong;
                    scaleTween.SpineEngine$GlobalManagers$Tweens$Interfaces$ITween$EaseType = SpineEngine.Maths.Easing.EaseType.CubicIn;
                    scaleTween.SpineEngine$GlobalManagers$Tweens$Interfaces$ITween$Delay = delay;
                    SpineEngine.Core.Instance.GetGlobalManager(SpineEngine.GlobalManagers.Tweens.TweenGlobalManager).StartTween(scaleTween);
                }

                // every so often change our color
                if (FateRandom.Fate.GlobalFate.Chance(80)) {
                    var color = transform.Entity.GetOrCreateComponent(SpineEngine.ECS.Components.ColorComponent);
                    var colorTween = SpineEngine.GlobalManagers.Tweens.TweenExt.TweenTo(color, this.RandomColor(), 2.0);
                    colorTween.SpineEngine$GlobalManagers$Tweens$Interfaces$ITween$Delay = delay;
                    SpineEngine.Core.Instance.GetGlobalManager(SpineEngine.GlobalManagers.Tweens.TweenGlobalManager).StartTween(colorTween);
                }
            },
            RandomColor: function () {
                return new Microsoft.Xna.Framework.Color.$ctor8(FateRandom.Fate.GlobalFate.NextFloat(), FateRandom.Fate.GlobalFate.NextFloat(), FateRandom.Fate.GlobalFate.NextFloat());
            }
        }
    });

    Bridge.define("MyONez.Base.Screens.TransitionsScene", {
        inherits: [MyONez.Base.Screens.BaseScene],
        ctors: {
            ctor: function () {
                var $t;
                this.$initialize();
                MyONez.Base.Screens.BaseScene.ctor.call(this);
                this.SetDesignResolution(1280, 720, SpineEngine.Graphics.ResolutionPolicy.SceneResolutionPolicy.BestFit);
                SpineEngine.Core.Instance.Screen.SetSize(1280, 720);

                this.AddRenderer(SpineEngine.Graphics.Renderers.RenderLayerExcludeRenderer, new SpineEngine.Graphics.Renderers.RenderLayerExcludeRenderer([MyONez.Base.Screens.BaseScene.ScreenSpaceRenderLayer]));

                var entity = this.CreateEntity("ui");
                var ui = entity.AddComponent(MyONez.Base.AdditionalStuff.FaceUI.ECS.Components.UIComponent).UserInterface;
                var panel = new FaceUI.Entities.Panel.$ctor1(new Microsoft.Xna.Framework.Vector2.$ctor2(300, -1), FaceUI.Entities.PanelSkin.None);
                ui.AddEntity(panel);
                $t = Bridge.getEnumerator(this.GetTransitions(), System.Tuple$2(System.String,Function));
                try {
                    while ($t.moveNext()) {
                        var transitionDescription = { v : $t.Current };
                        var button = new FaceUI.Entities.Button.$ctor1(transitionDescription.v.Item1);
                        panel.AddChild(button);
                        button.OnClick = Bridge.fn.combine(button.OnClick, (function ($me, transitionDescription) {
                            return Bridge.fn.bind($me, function (butt) {
                                var transition = transitionDescription.v.Item2();
                                transition.SceneLoadAction = Bridge.fn.bind(this, $asm.$.MyONez.Base.Screens.TransitionsScene.f1);
                                SpineEngine.Core.Instance.SwitchScene$2(transition);
                            });
                        })(this, transitionDescription));
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }
            }
        },
        methods: {
            GetTransitions: function () {
                return new (Bridge.GeneratorEnumerable$1(System.Tuple$2(System.String,Function)))(Bridge.fn.bind(this, function ()  {
                    var $step = 0,
                        $jumpFromFinally,
                        $returnValue,
                        $async_e;

                    var $enumerator = new (Bridge.GeneratorEnumerator$1(System.Tuple$2(System.String,Function)))(Bridge.fn.bind(this, function () {
                        try {
                            for (;;) {
                                switch ($step) {
                                    case 0: {
                                        $enumerator.current = { Item1: "Cinematic Letterbox", Item2: $asm.$.MyONez.Base.Screens.TransitionsScene.f2 };
                                            $step = 1;
                                            return true;
                                    }
                                    case 1: {
                                        $enumerator.current = { Item1: "Fade", Item2: $asm.$.MyONez.Base.Screens.TransitionsScene.f3 };
                                            $step = 2;
                                            return true;
                                    }
                                    case 2: {
                                        $enumerator.current = { Item1: "Quick", Item2: $asm.$.MyONez.Base.Screens.TransitionsScene.f4 };
                                            $step = 3;
                                            return true;
                                    }
                                    case 3: {
                                        $enumerator.current = { Item1: "Squares", Item2: $asm.$.MyONez.Base.Screens.TransitionsScene.f5 };
                                            $step = 4;
                                            return true;
                                    }
                                    case 4: {
                                        $enumerator.current = { Item1: "Texture Wipe", Item2: Bridge.fn.bind(this, $asm.$.MyONez.Base.Screens.TransitionsScene.f6) };
                                            $step = 5;
                                            return true;
                                    }
                                    case 5: {
                                        $enumerator.current = { Item1: "Transform", Item2: $asm.$.MyONez.Base.Screens.TransitionsScene.f7 };
                                            $step = 6;
                                            return true;
                                    }
                                    case 6: {
                                        $enumerator.current = { Item1: "Wind", Item2: $asm.$.MyONez.Base.Screens.TransitionsScene.f8 };
                                            $step = 7;
                                            return true;
                                    }
                                    case 7: {

                                    }
                                    default: {
                                        return false;
                                    }
                                }
                            }
                        } catch($async_e1) {
                            $async_e = System.Exception.create($async_e1);
                            throw $async_e;
                        }
                    }));
                    return $enumerator;
                }));
            }
        }
    });

    Bridge.ns("MyONez.Base.Screens.TransitionsScene", $asm.$);

    Bridge.apply($asm.$.MyONez.Base.Screens.TransitionsScene, {
        f1: function () {
            return this;
        },
        f2: function () {
            return new MyONez.Base.AdditionalStuff.SceneTransitions.CinematicLetterboxTransition();
        },
        f3: function () {
            return new MyONez.Base.AdditionalStuff.SceneTransitions.FadeTransition();
        },
        f4: function () {
            return new SpineEngine.Graphics.Transitions.QuickTransition();
        },
        f5: function () {
            return new MyONez.Base.AdditionalStuff.SceneTransitions.SquaresTransition();
        },
        f6: function () {
            return new MyONez.Base.AdditionalStuff.SceneTransitions.TextureWipeTransition(this.Content.Load(Microsoft.Xna.Framework.Graphics.Texture2D, MyONez.Base.ContentPaths.Textures.TextureWipeTransition.angular));
        },
        f7: function () {
            return new MyONez.Base.AdditionalStuff.SceneTransitions.TransformTransition();
        },
        f8: function () {
            return new MyONez.Base.AdditionalStuff.SceneTransitions.WindTransition();
        }
    });

    Bridge.define("MyONez.Base.Screens.UIScene", {
        inherits: [MyONez.Base.Screens.BaseScene],
        fields: {
            panels: null,
            nextExampleButton: null,
            previousExampleButton: null,
            targetEntityShow: null,
            currExample: 0
        },
        ctors: {
            init: function () {
                this.panels = new (System.Collections.Generic.List$1(FaceUI.Entities.Panel)).ctor();
                this.currExample = 0;
            },
            ctor: function () {
                this.$initialize();
                MyONez.Base.Screens.BaseScene.ctor.call(this);
                this.SetDesignResolution(1280, 720, SpineEngine.Graphics.ResolutionPolicy.SceneResolutionPolicy.None);
                SpineEngine.Core.Instance.Screen.SetSize(1280, 720);

                this.AddRenderer(SpineEngine.Graphics.Renderers.RenderLayerExcludeRenderer, new SpineEngine.Graphics.Renderers.RenderLayerExcludeRenderer([MyONez.Base.Screens.BaseScene.ScreenSpaceRenderLayer]));

                //this.AddEntitySystem(new UIUpdateSystem(this.Content, Core.Instance.GraphicsDevice));

                var ui = this.CreateEntity("ui");
                var uiComponent = ui.AddComponent(MyONez.Base.AdditionalStuff.FaceUI.ECS.Components.UIComponent);
                uiComponent.UserInterface = this.InitExamplesAndUI();
            }
        },
        methods: {
            /**
             * Create the top bar with next / prev buttons etc, and init all UI example panels.
             *
             * @instance
             * @private
             * @this MyONez.Base.Screens.UIScene
             * @memberof MyONez.Base.Screens.UIScene
             * @return  {FaceUI.UserInterface}
             */
            InitExamplesAndUI: function () {
                var $t, $t1, $t2, $t3, $t4;
                // will init examples only if true
                var initExamples = true;

                // create top panel
                var topPanelHeight = 65;
                var topPanel = new FaceUI.Entities.Panel.$ctor1(new Microsoft.Xna.Framework.Vector2.$ctor2(0, ((topPanelHeight + 2) | 0)), FaceUI.Entities.PanelSkin.Simple, FaceUI.Entities.Anchor.TopCenter);
                topPanel.Padding = Microsoft.Xna.Framework.Vector2.Zero.$clone();
                var userInterface = new FaceUI.UserInterface();
                userInterface.AddEntity(topPanel);
                userInterface.ShowCursor = false;
                // add previous example button
                this.previousExampleButton = new FaceUI.Entities.Button.$ctor1("<- Back", FaceUI.Entities.ButtonSkin.Default, FaceUI.Entities.Anchor.Auto, new Microsoft.Xna.Framework.Vector2.$ctor2(300, topPanelHeight));
                this.previousExampleButton.OnClick = Bridge.fn.bind(this, $asm.$.MyONez.Base.Screens.UIScene.f1);
                topPanel.AddChild(this.previousExampleButton);

                // add next example button
                this.nextExampleButton = new FaceUI.Entities.Button.$ctor1("Next ->", FaceUI.Entities.ButtonSkin.Default, FaceUI.Entities.Anchor.TopRight, new Microsoft.Xna.Framework.Vector2.$ctor2(300, topPanelHeight));
                this.nextExampleButton.OnClick = Bridge.fn.bind(this, $asm.$.MyONez.Base.Screens.UIScene.f2);
                this.nextExampleButton.Identifier = "next_btn";
                topPanel.AddChild(this.nextExampleButton);

                // add show-get button
                var showGitButton = new FaceUI.Entities.Button.$ctor1("Git Repo", FaceUI.Entities.ButtonSkin.Fancy, FaceUI.Entities.Anchor.TopCenter, new Microsoft.Xna.Framework.Vector2.$ctor2(280, topPanelHeight));
                showGitButton.OnClick = $asm.$.MyONez.Base.Screens.UIScene.f3;
                topPanel.AddChild(showGitButton);
                // events panel for debug
                var eventsPanel = new FaceUI.Entities.Panel.$ctor1(new Microsoft.Xna.Framework.Vector2.$ctor2(400, 530), FaceUI.Entities.PanelSkin.Simple, FaceUI.Entities.Anchor.CenterLeft, new Microsoft.Xna.Framework.Vector2.$ctor2(-10, 0));
                eventsPanel.Visible = false;

                // events log (single-time events)
                eventsPanel.AddChild(new FaceUI.Entities.Label.$ctor1("Events Log:"));
                var eventsLog = new FaceUI.Entities.SelectList.$ctor2(new Microsoft.Xna.Framework.Vector2.$ctor2(-1, 280), 9, void 0, 4);
                eventsLog.ExtraSpaceBetweenLines = -8;
                eventsLog.ItemsScale = 0.5;
                eventsLog.Locked = true;
                eventsPanel.AddChild(eventsLog);

                // current events (events that happen while something is true)
                eventsPanel.AddChild(new FaceUI.Entities.Label.$ctor1("Current Events:"));
                var eventsNow = new FaceUI.Entities.SelectList.$ctor2(new Microsoft.Xna.Framework.Vector2.$ctor2(-1, 100), 9, void 0, 4);
                eventsNow.ExtraSpaceBetweenLines = -8;
                eventsNow.ItemsScale = 0.5;
                eventsNow.Locked = true;
                eventsPanel.AddChild(eventsNow);

                // paragraph to show currently active panel
                this.targetEntityShow = new FaceUI.Entities.Paragraph.$ctor1("test", FaceUI.Entities.Anchor.Auto, Microsoft.Xna.Framework.Color.White.$clone(), 0.75, void 0, void 0);
                eventsPanel.AddChild(this.targetEntityShow);

                // add the events panel
                userInterface.AddEntity(eventsPanel);

                // whenever events log list size changes, make sure its not too long. if it is, trim it.
                eventsLog.OnListChange = $asm.$.MyONez.Base.Screens.UIScene.f4;

                // listen to all global events - one timers
                userInterface.OnClick = function (entity) {
                    eventsLog.AddItem("Click: " + (Bridge.Reflection.getTypeName(Bridge.getType(entity)) || ""));
                    eventsLog.scrollToEnd();
                };
                userInterface.OnRightClick = function (entity) {
                    eventsLog.AddItem("RightClick: " + (Bridge.Reflection.getTypeName(Bridge.getType(entity)) || ""));
                    eventsLog.scrollToEnd();
                };
                userInterface.OnMouseDown = function (entity) {
                    eventsLog.AddItem("MouseDown: " + (Bridge.Reflection.getTypeName(Bridge.getType(entity)) || ""));
                    eventsLog.scrollToEnd();
                };
                userInterface.OnRightMouseDown = function (entity) {
                    eventsLog.AddItem("RightMouseDown: " + (Bridge.Reflection.getTypeName(Bridge.getType(entity)) || ""));
                    eventsLog.scrollToEnd();
                };
                userInterface.OnMouseEnter = function (entity) {
                    eventsLog.AddItem("MouseEnter: " + (Bridge.Reflection.getTypeName(Bridge.getType(entity)) || ""));
                    eventsLog.scrollToEnd();
                };
                userInterface.OnMouseLeave = function (entity) {
                    eventsLog.AddItem("MouseLeave: " + (Bridge.Reflection.getTypeName(Bridge.getType(entity)) || ""));
                    eventsLog.scrollToEnd();
                };
                userInterface.OnMouseReleased = function (entity) {
                    eventsLog.AddItem("MouseReleased: " + (Bridge.Reflection.getTypeName(Bridge.getType(entity)) || ""));
                    eventsLog.scrollToEnd();
                };
                userInterface.OnMouseWheelScroll = function (entity) {
                    eventsLog.AddItem("Scroll: " + (Bridge.Reflection.getTypeName(Bridge.getType(entity)) || ""));
                    eventsLog.scrollToEnd();
                };
                userInterface.OnStartDrag = function (entity) {
                    eventsLog.AddItem("StartDrag: " + (Bridge.Reflection.getTypeName(Bridge.getType(entity)) || ""));
                    eventsLog.scrollToEnd();
                };
                userInterface.OnStopDrag = function (entity) {
                    eventsLog.AddItem("StopDrag: " + (Bridge.Reflection.getTypeName(Bridge.getType(entity)) || ""));
                    eventsLog.scrollToEnd();
                };
                userInterface.OnFocusChange = function (entity) {
                    eventsLog.AddItem("FocusChange: " + (Bridge.Reflection.getTypeName(Bridge.getType(entity)) || ""));
                    eventsLog.scrollToEnd();
                };
                userInterface.OnValueChange = function (entity) {
                    if (Bridge.referenceEquals(entity.Parent, eventsLog)) {
                        return;
                    }
                    eventsLog.AddItem("ValueChanged: " + (Bridge.Reflection.getTypeName(Bridge.getType(entity)) || ""));
                    eventsLog.scrollToEnd();
                };

                // clear the current events after every frame they were drawn
                eventsNow.AfterDraw = function (entity) {
                    eventsNow.ClearItems();
                };

                // listen to all global events - happening now
                userInterface.WhileDragging = function (entity) {
                    eventsNow.AddItem("Dragging: " + (Bridge.Reflection.getTypeName(Bridge.getType(entity)) || ""));
                    eventsNow.scrollToEnd();
                };
                userInterface.WhileMouseDown = function (entity) {
                    eventsNow.AddItem("MouseDown: " + (Bridge.Reflection.getTypeName(Bridge.getType(entity)) || ""));
                    eventsNow.scrollToEnd();
                };
                userInterface.WhileMouseHover = function (entity) {
                    eventsNow.AddItem("MouseHover: " + (Bridge.Reflection.getTypeName(Bridge.getType(entity)) || ""));
                    eventsNow.scrollToEnd();
                };
                eventsNow.MaxItems = 4;

                // add extra info button
                var infoBtn = new FaceUI.Entities.Button.$ctor1("  Events", 0, FaceUI.Entities.Anchor.BottomLeft, new Microsoft.Xna.Framework.Vector2.$ctor2(280, -1), new Microsoft.Xna.Framework.Vector2.$ctor2(140, 0));
                infoBtn.AddChild(new FaceUI.Entities.Icon.$ctor1(FaceUI.Entities.IconType.Scroll, FaceUI.Entities.Anchor.CenterLeft), true);
                infoBtn.OnClick = function (entity) {
                    eventsPanel.Visible = !eventsPanel.Visible;
                };
                infoBtn.ToggleMode = true;
                infoBtn.ToolTipText = "Show events log.";
                userInterface.AddEntity(infoBtn);

                // add button to apply transformations
                var transBtn = new FaceUI.Entities.Button.$ctor1("Transform UI", 0, FaceUI.Entities.Anchor.BottomLeft, new Microsoft.Xna.Framework.Vector2.$ctor2(320, -1), new Microsoft.Xna.Framework.Vector2.$ctor2(420, 0));
                transBtn.OnClick = function (entity) {
                    if (System.Nullable.lifteq(Microsoft.Xna.Framework.Matrix.op_Equality, System.Nullable.lift1("$clone", userInterface.RenderTargetTransformMatrix), null)) {
                        userInterface.RenderTargetTransformMatrix = Microsoft.Xna.Framework.Matrix.op_Multiply(Microsoft.Xna.Framework.Matrix.op_Multiply(Microsoft.Xna.Framework.Matrix.CreateScale$1(0.6), Microsoft.Xna.Framework.Matrix.CreateRotationZ(0.05)), Microsoft.Xna.Framework.Matrix.CreateTranslation(new Microsoft.Xna.Framework.Vector3.$ctor3(150, 150, 0)));
                    } else {
                        userInterface.RenderTargetTransformMatrix = null;
                    }
                };
                transBtn.ToggleMode = true;
                transBtn.ToolTipText = "Apply transform matrix on the entire UI.";
                userInterface.AddEntity(transBtn);

                // add button to enable debug mode
                var debugBtn = new FaceUI.Entities.Button.$ctor1("Debug Mode", 0, FaceUI.Entities.Anchor.BottomLeft, new Microsoft.Xna.Framework.Vector2.$ctor2(300, -1), new Microsoft.Xna.Framework.Vector2.$ctor2(740, 0));
                debugBtn.OnClick = function (entity) {
                    userInterface.DebugDraw = !userInterface.DebugDraw;
                };
                debugBtn.ToggleMode = true;
                debugBtn.ToolTipText = "Enable special debug drawing mode.";
                userInterface.AddEntity(debugBtn);

                // zoom in / out factor
                var zoominFactor = 0.05;

                // scale show
                var scaleShow = new FaceUI.Entities.Paragraph.$ctor2("100%", FaceUI.Entities.Anchor.BottomLeft, void 0, new Microsoft.Xna.Framework.Vector2.$ctor2(10, 70), void 0);
                userInterface.AddEntity(scaleShow);

                // init zoom-out button
                var zoomout = new FaceUI.Entities.Button.$ctor1("", FaceUI.Entities.ButtonSkin.Default, FaceUI.Entities.Anchor.BottomLeft, new Microsoft.Xna.Framework.Vector2.$ctor2(70, 70));
                var zoomoutIcon = new FaceUI.Entities.Icon.$ctor1(FaceUI.Entities.IconType.ZoomOut, FaceUI.Entities.Anchor.Center, 0.75);
                zoomout.AddChild(zoomoutIcon, true);
                zoomout.OnClick = function (btn) {
                    if (userInterface.GlobalScale > 0.5) {
                        userInterface.GlobalScale -= zoominFactor;
                    }
                    scaleShow.Text = (Bridge.toString(Bridge.Int.clip32(Bridge.Math.round(userInterface.GlobalScale * 100.0, 0, 6))) || "") + "%";
                };
                userInterface.AddEntity(zoomout);

                // init zoom-in button
                var zoomin = new FaceUI.Entities.Button.$ctor1("", FaceUI.Entities.ButtonSkin.Default, FaceUI.Entities.Anchor.BottomLeft, new Microsoft.Xna.Framework.Vector2.$ctor2(70, 70), new Microsoft.Xna.Framework.Vector2.$ctor2(70, 0));
                var zoominIcon = new FaceUI.Entities.Icon.$ctor1(FaceUI.Entities.IconType.ZoomIn, FaceUI.Entities.Anchor.Center, 0.75);
                zoomin.AddChild(zoominIcon, true);
                zoomin.OnClick = function (btn) {
                    if (userInterface.GlobalScale < 1.45) {
                        userInterface.GlobalScale += zoominFactor;
                    }
                    scaleShow.Text = (Bridge.toString(Bridge.Int.clip32(Bridge.Math.round(userInterface.GlobalScale * 100.0, 0, 6))) || "") + "%";
                };
                userInterface.AddEntity(zoomin);

                // init all examples

                if (initExamples) {

                    // example: welcome message
                    {
                        // create panel and add to list of panels and manager
                        var panel = new FaceUI.Entities.Panel.$ctor1(new Microsoft.Xna.Framework.Vector2.$ctor2(520, -1));
                        this.panels.add(panel);
                        userInterface.AddEntity(panel);

                        // add title and text
                        var title = new FaceUI.Entities.Image.$ctor1(this.Content.Load(Microsoft.Xna.Framework.Graphics.Texture2D, "example/GeonBitUI-sm"), new Microsoft.Xna.Framework.Vector2.$ctor2(400, 240), 0, FaceUI.Entities.Anchor.TopCenter, new Microsoft.Xna.Framework.Vector2.$ctor2(0, -20));
                        title.ShadowColor = new Microsoft.Xna.Framework.Color.$ctor7(0, 0, 0, 128);
                        title.ShadowOffset = Microsoft.Xna.Framework.Vector2.op_Multiply$1(Microsoft.Xna.Framework.Vector2.One.$clone(), -6);
                        panel.AddChild(title);
                        var welcomeText = new FaceUI.Entities.RichParagraph.$ctor2("Welcome to {{RED}}GeonBit{{MAGENTA}}.UI{{DEFAULT}}!\n\nGeonBit.UI is the UI system of the GeonBit project.\nIt provide a simple yet extensive UI for MonoGame based projects.\n\nTo start the demo, please click the {{ITALIC}}'Next'{{DEFAULT}} button on the top bar.\n\n");
                        panel.AddChild(welcomeText);
                        panel.AddChild(new FaceUI.Entities.Paragraph.$ctor2("V3.4.0.1", FaceUI.Entities.Anchor.BottomRight)).FillColor = Microsoft.Xna.Framework.Color.Yellow.$clone();
                    }

                    // example: features list
                    {
                        // create panel and add to list of panels and manager
                        var panel1 = new FaceUI.Entities.Panel.$ctor1(new Microsoft.Xna.Framework.Vector2.$ctor2(500, -1));
                        this.panels.add(panel1);
                        userInterface.AddEntity(panel1);

                        // add title and text
                        panel1.AddChild(new FaceUI.Entities.Header.$ctor1("Widgets Types"));
                        panel1.AddChild(new FaceUI.Entities.HorizontalLine.ctor());
                        panel1.AddChild(new FaceUI.Entities.Paragraph.$ctor2("GeonBit.UI implements the following widgets:\n\n- Paragraphs\n- Headers\n- Buttons\n- Panels\n- CheckBox\n- Radio buttons\n- Rectangles\n- Images & Icons\n- Select List\n- Dropdown\n- Panel Tabs\n- Sliders & Progressbars\n- Text input\n- Tooltip Text\n- And more...\n"));
                    }

                    // example: basic concepts
                    {
                        // create panel and add to list of panels and manager
                        var panel2 = new FaceUI.Entities.Panel.$ctor1(new Microsoft.Xna.Framework.Vector2.$ctor2(740, -1));
                        this.panels.add(panel2);
                        userInterface.AddEntity(panel2);

                        // add title and text
                        panel2.AddChild(new FaceUI.Entities.Header.$ctor1("Basic Concepts"));
                        panel2.AddChild(new FaceUI.Entities.HorizontalLine.ctor());
                        panel2.AddChild(new FaceUI.Entities.Paragraph.$ctor2("Panels are the basic containers of GeonBit.UI. They are like window forms.\n\nTo position elements inside panels or other widgets, you set an anchor and offset. An anchor is a pre-defined position in parent element, like top-left corner, center, etc. and offset is just the distance from that point.\n\nAnother thing to keep in mind is size; Most widgets come with a default size, but for those you need to set size for remember that setting size 0 will take full width / height. For example, size of X = 0, Y = 100 means the widget will be 100 pixels height and the width of its parent (minus the parent padding)."));
                    }

                    // example: anchors
                    {
                        // create panel and add to list of panels and manager
                        var panel3 = new FaceUI.Entities.Panel.$ctor1(new Microsoft.Xna.Framework.Vector2.$ctor2(800, 620));
                        this.panels.add(panel3);
                        userInterface.AddEntity(panel3);

                        // add title and text
                        panel3.AddChild(new FaceUI.Entities.Paragraph.$ctor1("Anchors help position elements. For example, this paragraph anchor is 'center'.\n\nThe most common anchors are 'Auto' and 'AutoInline', which will place entities one after another automatically.", FaceUI.Entities.Anchor.Center, Microsoft.Xna.Framework.Color.White.$clone(), 0.8, new Microsoft.Xna.Framework.Vector2.$ctor2(320, 0)));

                        panel3.AddChild(new FaceUI.Entities.Header.$ctor1("Anchors", FaceUI.Entities.Anchor.TopCenter, new Microsoft.Xna.Framework.Vector2.$ctor2(0, 100)));
                        panel3.AddChild(new FaceUI.Entities.Paragraph.$ctor1("top-left", FaceUI.Entities.Anchor.TopLeft, Microsoft.Xna.Framework.Color.Yellow.$clone(), 0.8));
                        panel3.AddChild(new FaceUI.Entities.Paragraph.$ctor1("top-center", FaceUI.Entities.Anchor.TopCenter, Microsoft.Xna.Framework.Color.Yellow.$clone(), 0.8));
                        panel3.AddChild(new FaceUI.Entities.Paragraph.$ctor1("top-right", FaceUI.Entities.Anchor.TopRight, Microsoft.Xna.Framework.Color.Yellow.$clone(), 0.8));
                        panel3.AddChild(new FaceUI.Entities.Paragraph.$ctor1("bottom-left", FaceUI.Entities.Anchor.BottomLeft, Microsoft.Xna.Framework.Color.Yellow.$clone(), 0.8));
                        panel3.AddChild(new FaceUI.Entities.Paragraph.$ctor1("bottom-center", FaceUI.Entities.Anchor.BottomCenter, Microsoft.Xna.Framework.Color.Yellow.$clone(), 0.8));
                        panel3.AddChild(new FaceUI.Entities.Paragraph.$ctor1("bottom-right", FaceUI.Entities.Anchor.BottomRight, Microsoft.Xna.Framework.Color.Yellow.$clone(), 0.8));
                        panel3.AddChild(new FaceUI.Entities.Paragraph.$ctor1("center-left", FaceUI.Entities.Anchor.CenterLeft, Microsoft.Xna.Framework.Color.Yellow.$clone(), 0.8));
                        panel3.AddChild(new FaceUI.Entities.Paragraph.$ctor1("center-right", FaceUI.Entities.Anchor.CenterRight, Microsoft.Xna.Framework.Color.Yellow.$clone(), 0.8));
                    }

                    // example: buttons
                    {
                        // create panel and add to list of panels and manager
                        var panel4 = new FaceUI.Entities.Panel.$ctor1(new Microsoft.Xna.Framework.Vector2.$ctor2(450, -1));
                        this.panels.add(panel4);
                        userInterface.AddEntity(panel4);

                        // add title and text
                        panel4.AddChild(new FaceUI.Entities.Header.$ctor1("Buttons"));
                        panel4.AddChild(new FaceUI.Entities.HorizontalLine.ctor());
                        panel4.AddChild(new FaceUI.Entities.Paragraph.$ctor2("GeonBit.UI comes with 3 button skins:"));

                        // add default buttons
                        panel4.AddChild(new FaceUI.Entities.Button.$ctor1("Default", FaceUI.Entities.ButtonSkin.Default));
                        panel4.AddChild(new FaceUI.Entities.Button.$ctor1("Alternative", FaceUI.Entities.ButtonSkin.Alternative));
                        panel4.AddChild(new FaceUI.Entities.Button.$ctor1("Fancy", FaceUI.Entities.ButtonSkin.Fancy));

                        // custom button
                        var custom = new FaceUI.Entities.Button.$ctor1("Custom Skin", FaceUI.Entities.ButtonSkin.Default, 9, new Microsoft.Xna.Framework.Vector2.$ctor2(0, 80), void 0);
                        custom.SetCustomSkin(this.Content.Load(Microsoft.Xna.Framework.Graphics.Texture2D, "example/btn_default"), this.Content.Load(Microsoft.Xna.Framework.Graphics.Texture2D, "example/btn_hover"), this.Content.Load(Microsoft.Xna.Framework.Graphics.Texture2D, "example/btn_down"));
                        panel4.AddChild(custom);

                        // toggle button
                        panel4.AddChild(new FaceUI.Entities.LineSpace.ctor());
                        panel4.AddChild(new FaceUI.Entities.HorizontalLine.ctor());
                        panel4.AddChild(new FaceUI.Entities.LineSpace.ctor());
                        panel4.AddChild(new FaceUI.Entities.Paragraph.$ctor2("Note: buttons can also work in toggle mode:"));
                        var btn = new FaceUI.Entities.Button.$ctor1("Toggle Me!", FaceUI.Entities.ButtonSkin.Default);
                        btn.ToggleMode = true;
                        panel4.AddChild(btn);
                    }

                    // example: checkboxes and radio buttons
                    {
                        // create panel and add to list of panels and manager
                        var panel5 = new FaceUI.Entities.Panel.$ctor1(new Microsoft.Xna.Framework.Vector2.$ctor2(450, -1));
                        this.panels.add(panel5);
                        userInterface.AddEntity(panel5);

                        // checkboxes example
                        panel5.AddChild(new FaceUI.Entities.Header.$ctor1("CheckBox"));
                        panel5.AddChild(new FaceUI.Entities.HorizontalLine.ctor());
                        panel5.AddChild(new FaceUI.Entities.Paragraph.$ctor2("CheckBoxes example:"));

                        panel5.AddChild(new FaceUI.Entities.CheckBox.$ctor1("CheckBox 1"));
                        panel5.AddChild(new FaceUI.Entities.CheckBox.$ctor1("CheckBox 2"));

                        // radio example
                        panel5.AddChild(new FaceUI.Entities.LineSpace.$ctor1(3));
                        panel5.AddChild(new FaceUI.Entities.Header.$ctor1("Radio buttons"));
                        panel5.AddChild(new FaceUI.Entities.HorizontalLine.ctor());
                        panel5.AddChild(new FaceUI.Entities.Paragraph.$ctor2("Radio buttons example:"));

                        panel5.AddChild(new FaceUI.Entities.RadioButton.$ctor1("Option 1"));
                        panel5.AddChild(new FaceUI.Entities.RadioButton.$ctor1("Option 2"));
                        panel5.AddChild(new FaceUI.Entities.RadioButton.$ctor1("Option 3"));
                    }

                    // example: panels
                    {
                        // create panel and add to list of panels and manager
                        var panel6 = new FaceUI.Entities.Panel.$ctor1(new Microsoft.Xna.Framework.Vector2.$ctor2(450, -1));
                        this.panels.add(panel6);
                        userInterface.AddEntity(panel6);

                        // title and text
                        panel6.AddChild(new FaceUI.Entities.Header.$ctor1("Panels"));
                        panel6.AddChild(new FaceUI.Entities.HorizontalLine.ctor());
                        panel6.AddChild(new FaceUI.Entities.Paragraph.$ctor2("GeonBit.UI comes with 4 alternative panel skins:"));
                        var panelHeight = 80;
                        {
                            var intPanel = new FaceUI.Entities.Panel.$ctor1(new Microsoft.Xna.Framework.Vector2.$ctor2(0, panelHeight), FaceUI.Entities.PanelSkin.Fancy, FaceUI.Entities.Anchor.Auto);
                            intPanel.AddChild(new FaceUI.Entities.Paragraph.$ctor2("Fancy Panel", FaceUI.Entities.Anchor.Center));
                            panel6.AddChild(intPanel);
                        }
                        {
                            var intPanel1 = new FaceUI.Entities.Panel.$ctor1(new Microsoft.Xna.Framework.Vector2.$ctor2(0, panelHeight), FaceUI.Entities.PanelSkin.Golden, FaceUI.Entities.Anchor.Auto);
                            intPanel1.AddChild(new FaceUI.Entities.Paragraph.$ctor2("Golden Panel", FaceUI.Entities.Anchor.Center));
                            panel6.AddChild(intPanel1);
                        }
                        {
                            var intPanel2 = new FaceUI.Entities.Panel.$ctor1(new Microsoft.Xna.Framework.Vector2.$ctor2(0, panelHeight), FaceUI.Entities.PanelSkin.Simple, FaceUI.Entities.Anchor.Auto);
                            intPanel2.AddChild(new FaceUI.Entities.Paragraph.$ctor2("Simple Panel", FaceUI.Entities.Anchor.Center));
                            panel6.AddChild(intPanel2);
                        }
                        {
                            var intPanel3 = new FaceUI.Entities.Panel.$ctor1(new Microsoft.Xna.Framework.Vector2.$ctor2(0, panelHeight), FaceUI.Entities.PanelSkin.ListBackground, FaceUI.Entities.Anchor.Auto);
                            intPanel3.AddChild(new FaceUI.Entities.Paragraph.$ctor2("List Background", FaceUI.Entities.Anchor.Center));
                            panel6.AddChild(intPanel3);
                        }
                        {
                            var intPanel4 = new FaceUI.Entities.Panel.$ctor1(new Microsoft.Xna.Framework.Vector2.$ctor2(0, Bridge.Int.mul(panelHeight, 2)), FaceUI.Entities.PanelSkin.ListBackground, FaceUI.Entities.Anchor.Auto);
                            intPanel4.SetCustomSkin(this.Content.Load(Microsoft.Xna.Framework.Graphics.Texture2D, "example/btn_default"));
                            intPanel4.AddChild(new FaceUI.Entities.Paragraph.$ctor2("Custom Skin", FaceUI.Entities.Anchor.Center));
                            panel6.AddChild(intPanel4);
                        }
                    }

                    // example: draggable
                    {
                        // create panel and add to list of panels and manager
                        var panel7 = new FaceUI.Entities.Panel.$ctor1(new Microsoft.Xna.Framework.Vector2.$ctor2(450, 690));
                        panel7.Draggable = true;
                        this.panels.add(panel7);
                        userInterface.AddEntity(panel7);

                        // title and text
                        panel7.AddChild(new FaceUI.Entities.Header.$ctor1("Draggable"));
                        panel7.AddChild(new FaceUI.Entities.HorizontalLine.ctor());
                        panel7.AddChild(new FaceUI.Entities.Paragraph.$ctor2("This panel can be dragged, try it out!"));
                        panel7.AddChild(new FaceUI.Entities.LineSpace.ctor());
                        panel7.AddChild(new FaceUI.Entities.HorizontalLine.ctor());
                        panel7.AddChild(new FaceUI.Entities.LineSpace.ctor());
                        var paragraph = new FaceUI.Entities.Paragraph.$ctor2("Any type of entity can be dragged. For example, try to drag this text!");
                        paragraph.SetStyleProperty("FillColor", new FaceUI.DataTypes.StyleProperty.$ctor1(Microsoft.Xna.Framework.Color.Yellow.$clone()));
                        paragraph.SetStyleProperty("FillColor", new FaceUI.DataTypes.StyleProperty.$ctor1(Microsoft.Xna.Framework.Color.Purple.$clone()), FaceUI.Entities.EntityState.MouseHover);
                        paragraph.Draggable = true;
                        paragraph.LimitDraggingToParentBoundaries = false;
                        panel7.AddChild(paragraph);

                        // internal panel with internal draggable
                        var panelInt = new FaceUI.Entities.Panel.$ctor1(new Microsoft.Xna.Framework.Vector2.$ctor2(250, 250), FaceUI.Entities.PanelSkin.Golden, FaceUI.Entities.Anchor.AutoCenter);
                        panelInt.Draggable = true;
                        panelInt.AddChild(new FaceUI.Entities.Paragraph.$ctor1("This panel is draggable too, but limited to its parent boundaries.", FaceUI.Entities.Anchor.Center, Microsoft.Xna.Framework.Color.White.$clone(), 0.85));
                        panel7.AddChild(panelInt);
                    }

                    // example: animators
                    {
                        // create panel and add to list of panels and manager
                        var panel8 = new FaceUI.Entities.Panel.$ctor1(new Microsoft.Xna.Framework.Vector2.$ctor2(550, -1));
                        this.panels.add(panel8);
                        userInterface.AddEntity(panel8);

                        // add title and text
                        panel8.AddChild(new FaceUI.Entities.Header.$ctor1("Animators"));
                        panel8.AddChild(new FaceUI.Entities.HorizontalLine.ctor());
                        panel8.AddChild(new FaceUI.Entities.Paragraph.$ctor2("Animators are classes that bring UI elements into life by animating them. For example, take a look at these animators:"));

                        // float up-down
                        {
                            panel8.AddChild(new FaceUI.Entities.LineSpace.$ctor1(2));
                            var entity = panel8.AddChild(new FaceUI.Entities.Paragraph.$ctor2("Float Up-Down animator"));
                            entity.AttachAnimator(new FaceUI.Animators.FloatUpDownAnimator());
                        }

                        // wave animation
                        {
                            panel8.AddChild(new FaceUI.Entities.LineSpace.$ctor1(2));
                            var entity1 = panel8.AddChild(new FaceUI.Entities.RichParagraph.$ctor2("Wave text animator"));
                            entity1.AttachAnimator(new FaceUI.Animators.TextWaveAnimator());
                        }

                        // fade out
                        {
                            panel8.AddChild(new FaceUI.Entities.LineSpace.$ctor1(2));
                            var entity2 = panel8.AddChild(new FaceUI.Entities.Button.$ctor1("Fade Out (click to see)"));
                            var animator = entity2.AttachAnimator(($t = new FaceUI.Animators.FadeOutAnimator(), $t.Enabled = false, $t));
                            entity2.OnClick = Bridge.fn.combine(entity2.OnClick, function (ent) {
                                animator.Enabled = true;
                            });
                        }

                        // type writer animator
                        {
                            panel8.AddChild(new FaceUI.Entities.LineSpace.$ctor1(2));
                            var entity3 = panel8.AddChild(new FaceUI.Entities.RichParagraph.$ctor2(""));
                            var animator1 = entity3.AttachAnimator(($t = new FaceUI.Animators.TypeWriterAnimator(), $t.TextToType = "This is a type writer animation, text will appear as if someone is typing it in real time. {{YELLOW}}Click on the paragraph to reset animation.", $t));
                            entity3.OnClick = Bridge.fn.combine(entity3.OnClick, function (ent) {
                                animator1.Reset();
                            });
                        }
                    }

                    // example: sliders
                    {
                        // create panel and add to list of panels and manager
                        var panel9 = new FaceUI.Entities.Panel.$ctor1(new Microsoft.Xna.Framework.Vector2.$ctor2(450, -1));
                        this.panels.add(panel9);
                        userInterface.AddEntity(panel9);

                        // sliders title
                        panel9.AddChild(new FaceUI.Entities.Header.$ctor1("Sliders"));
                        panel9.AddChild(new FaceUI.Entities.HorizontalLine.ctor());
                        panel9.AddChild(new FaceUI.Entities.Paragraph.$ctor2("Sliders help pick numeric value in range:"));

                        panel9.AddChild(new FaceUI.Entities.Paragraph.$ctor2("\nDefault slider"));
                        panel9.AddChild(new FaceUI.Entities.Slider.$ctor1(0, 10, FaceUI.Entities.SliderSkin.Default));

                        panel9.AddChild(new FaceUI.Entities.Paragraph.$ctor2("\nFancy slider"));
                        panel9.AddChild(new FaceUI.Entities.Slider.$ctor1(0, 10, FaceUI.Entities.SliderSkin.Fancy));

                        // progressbar title
                        panel9.AddChild(new FaceUI.Entities.LineSpace.$ctor1(3));
                        panel9.AddChild(new FaceUI.Entities.Header.$ctor1("Progress bar"));
                        panel9.AddChild(new FaceUI.Entities.HorizontalLine.ctor());
                        panel9.AddChild(new FaceUI.Entities.Paragraph.$ctor2("Works just like sliders:"));
                        panel9.AddChild(new FaceUI.Entities.ProgressBar.$ctor1(0, 10));
                    }

                    // example: lists
                    {
                        // create panel and add to list of panels and manager
                        var panel10 = new FaceUI.Entities.Panel.$ctor1(new Microsoft.Xna.Framework.Vector2.$ctor2(450, -1));
                        this.panels.add(panel10);
                        userInterface.AddEntity(panel10);

                        // list title
                        panel10.AddChild(new FaceUI.Entities.Header.$ctor1("SelectList"));
                        panel10.AddChild(new FaceUI.Entities.HorizontalLine.ctor());
                        panel10.AddChild(new FaceUI.Entities.Paragraph.$ctor2("SelectLists let you pick a value from a list of items:"));

                        var list = new FaceUI.Entities.SelectList.$ctor2(new Microsoft.Xna.Framework.Vector2.$ctor2(0, 280));
                        list.AddItem("Warrior");
                        list.AddItem("Mage");
                        list.AddItem("Ranger");
                        list.AddItem("Rogue");
                        list.AddItem("Paladin");
                        list.AddItem("Cleric");
                        list.AddItem("Warlock");
                        list.AddItem("Barbarian");
                        list.AddItem("Monk");
                        list.AddItem("Ranger");
                        panel10.AddChild(list);
                    }

                    // example: list as tables
                    {
                        // create panel and add to list of panels and manager
                        var panel11 = new FaceUI.Entities.Panel.$ctor1(new Microsoft.Xna.Framework.Vector2.$ctor2(620, -1));
                        this.panels.add(panel11);
                        userInterface.AddEntity(panel11);

                        // list title
                        panel11.AddChild(new FaceUI.Entities.Header.$ctor1("SelectList as a Table"));
                        panel11.AddChild(new FaceUI.Entities.HorizontalLine.ctor());
                        panel11.AddChild(new FaceUI.Entities.Paragraph.$ctor2("With few simple tricks you can also create lists that behave like a table:"));

                        // create the list
                        var list1 = new FaceUI.Entities.SelectList.$ctor2(new Microsoft.Xna.Framework.Vector2.$ctor2(0, 280));

                        // lock and create title
                        list1.LockedItems.set(0, true);
                        list1.AddItem(System.String.format("{0}{1,-8} {2,-8} {3, -10}", "{{RED}}", "Name", "Class", "Level"));

                        // add items as formatted table
                        list1.AddItem(System.String.format("{0,-8} {1,-8} {2,-10}", "Joe", "Mage", "5"));
                        list1.AddItem(System.String.format("{0,-8} {1,-8} {2,-10}", "Ron", "Monk", "7"));
                        list1.AddItem(System.String.format("{0,-8} {1,-8} {2,-10}", "Alex", "Rogue", "3"));
                        list1.AddItem(System.String.format("{0,-8} {1,-8} {2,-10}", "Jim", "Paladin", "7"));
                        list1.AddItem(System.String.format("{0,-8} {1,-8} {2,-10}", "Abe", "Cleric", "8"));
                        list1.AddItem(System.String.format("{0,-8} {1,-8} {2,-10}", "James", "Warlock", "20"));
                        list1.AddItem(System.String.format("{0,-8} {1,-8} {2,-10}", "Bob", "Bard", "1"));
                        panel11.AddChild(list1);
                    }

                    // example: lists skins
                    {
                        // create panel and add to list of panels and manager
                        var panel12 = new FaceUI.Entities.Panel.$ctor1(new Microsoft.Xna.Framework.Vector2.$ctor2(450, -1));
                        this.panels.add(panel12);
                        userInterface.AddEntity(panel12);

                        // list title
                        panel12.AddChild(new FaceUI.Entities.Header.$ctor1("SelectList - Skin"));
                        panel12.AddChild(new FaceUI.Entities.HorizontalLine.ctor());
                        panel12.AddChild(new FaceUI.Entities.Paragraph.$ctor2("Just like panels, SelectList can use alternative skins:"));

                        var list2 = new FaceUI.Entities.SelectList.$ctor2(new Microsoft.Xna.Framework.Vector2.$ctor2(0, 280), 9, void 0, FaceUI.Entities.PanelSkin.Golden);
                        list2.AddItem("Warrior");
                        list2.AddItem("Mage");
                        list2.AddItem("Ranger");
                        list2.AddItem("Rogue");
                        list2.AddItem("Paladin");
                        list2.AddItem("Cleric");
                        list2.AddItem("Warlock");
                        list2.AddItem("Barbarian");
                        list2.AddItem("Monk");
                        list2.AddItem("Ranger");
                        panel12.AddChild(list2);
                    }

                    // example: dropdown
                    {
                        // create panel and add to list of panels and manager
                        var panel13 = new FaceUI.Entities.Panel.$ctor1(new Microsoft.Xna.Framework.Vector2.$ctor2(450, -1));
                        this.panels.add(panel13);
                        userInterface.AddEntity(panel13);

                        // dropdown title
                        panel13.AddChild(new FaceUI.Entities.Header.$ctor1("DropDown"));
                        panel13.AddChild(new FaceUI.Entities.HorizontalLine.ctor());

                        panel13.AddChild(new FaceUI.Entities.Paragraph.$ctor2("DropDown is just like a list, but take less space since it hide the list when not used:"));
                        var drop = new FaceUI.Entities.DropDown.$ctor1(new Microsoft.Xna.Framework.Vector2.$ctor2(0, 250));
                        drop.AddItem("Warrior");
                        drop.AddItem("Mage");
                        drop.AddItem("Ranger");
                        drop.AddItem("Rogue");
                        drop.AddItem("Paladin");
                        drop.AddItem("Cleric");
                        drop.AddItem("Warlock");
                        drop.AddItem("Barbarian");
                        drop.AddItem("Monk");
                        drop.AddItem("Ranger");
                        panel13.AddChild(drop);

                        panel13.AddChild(new FaceUI.Entities.Paragraph.$ctor2("And like list, we can set different skins:"));
                        drop = new FaceUI.Entities.DropDown.$ctor1(new Microsoft.Xna.Framework.Vector2.$ctor2(0, 180), 9, void 0, FaceUI.Entities.PanelSkin.Golden, void 0, true);
                        drop.AddItem("Warrior");
                        drop.AddItem("Mage");
                        drop.AddItem("Monk");
                        drop.AddItem("Ranger");
                        panel13.AddChild(drop);
                    }

                    // example: panels with scrollbars / overflow
                    //                {
                    //                    // create panel and add to list of panels and manager
                    //                    Panel panel = new Panel(new Vector2(450, 440));
                    //                    panels.Add(panel);
                    //                    userInterface.AddEntity(panel);

                    //                    // dropdown title
                    //                    panel.AddChild(new Header("Panel Overflow"));
                    //                    panel.AddChild(new HorizontalLine());
                    //                    panel.AddChild(new Paragraph(@"You can choose how to handle entities that overflow parent panel's boundaries. 

                    //The default behavior is to simply overflow (eg entities will be drawn as usual), but you can also make overflowing entities clip, or make the entire panel scrollable. 

                    //In this example, we use a panel with scrollbars.

                    //Note that in order to use clipping and scrollbar with Panels you need to set the UserInterface.Active.UseRenderTarget flag to true.

                    //Here's a button, to test clicking while scrolled:"));
                    //                    panel.AddChild(new Button("a button."));
                    //                    panel.AddChild(new Paragraph(@"And here's a dropdown:"));
                    //                    var dropdown = new DropDown(new Vector2(0, 220));
                    //                    for (int i = 1; i < 10; ++i)
                    //                        dropdown.AddItem("Option" + i.ToString());
                    //                    panel.AddChild(dropdown);
                    //                    panel.AddChild(new Paragraph(@"And a list:"));
                    //                    var list = new SelectList(new Vector2(0, 220));
                    //                    for (int i = 1; i < 10; ++i)
                    //                        list.AddItem("Option" + i.ToString());
                    //                    panel.AddChild(list);
                    //                    panel.PanelOverflowBehavior = PanelOverflowBehavior.Overflow;
                    //                    panel.Scrollbar.AdjustMaxAutomatically = true;
                    //                    panel.Identifier = "panel_with_scrollbar";
                    //                }

                    // example: icons
                    {
                        // create panel and add to list of panels and manager
                        var panel14 = new FaceUI.Entities.Panel.$ctor1(new Microsoft.Xna.Framework.Vector2.$ctor2(460, -1));
                        this.panels.add(panel14);
                        userInterface.AddEntity(panel14);

                        // icons title
                        panel14.AddChild(new FaceUI.Entities.Header.$ctor1("Icons"));
                        panel14.AddChild(new FaceUI.Entities.HorizontalLine.ctor());
                        panel14.AddChild(new FaceUI.Entities.Paragraph.$ctor2("GeonBit.UI comes with some built-in icons:"));

                        $t = Bridge.getEnumerator(System.Enum.getValues(FaceUI.Entities.IconType));
                        try {
                            while ($t.moveNext()) {
                                var icon = Bridge.cast($t.Current, FaceUI.Entities.IconType);
                                if (icon === FaceUI.Entities.IconType.None) {
                                    continue;
                                }
                                panel14.AddChild(new FaceUI.Entities.Icon.$ctor1(icon, FaceUI.Entities.Anchor.AutoInline));
                            }
                        } finally {
                            if (Bridge.is($t, System.IDisposable)) {
                                $t.System$IDisposable$Dispose();
                            }
                        }

                        panel14.AddChild(new FaceUI.Entities.Paragraph.$ctor2("And you can also add an inventory-like frame:"));
                        panel14.AddChild(new FaceUI.Entities.LineSpace.ctor());
                        for (var i = 0; i < 6; i = (i + 1) | 0) {
                            panel14.AddChild(new FaceUI.Entities.Icon.$ctor1(i, FaceUI.Entities.Anchor.AutoInline, 1, true));
                        }
                    }

                    // example: text input
                    {
                        // create panel and add to list of panels and manager
                        var panel15 = new FaceUI.Entities.Panel.$ctor1(new Microsoft.Xna.Framework.Vector2.$ctor2(450, -1));
                        this.panels.add(panel15);
                        userInterface.AddEntity(panel15);

                        // text input example
                        panel15.AddChild(new FaceUI.Entities.Header.$ctor1("Text Input"));
                        panel15.AddChild(new FaceUI.Entities.HorizontalLine.ctor());

                        // inliner
                        panel15.AddChild(new FaceUI.Entities.Paragraph.$ctor2("Text input let you get free text from the user:"));
                        var text = new FaceUI.Entities.TextInput.$ctor1(false);
                        text.PlaceholderText = "Insert text..";
                        panel15.AddChild(text);

                        // multiline
                        panel15.AddChild(new FaceUI.Entities.Paragraph.$ctor2("Text input can also be multiline, and use different panel skins:"));
                        var textMulti = new FaceUI.Entities.TextInput.$ctor2(true, new Microsoft.Xna.Framework.Vector2.$ctor2(0, 220), 9, void 0, FaceUI.Entities.PanelSkin.Golden);
                        textMulti.PlaceholderText = "Insert multiline text..";
                        panel15.AddChild(textMulti);

                        // with hidden password chars
                        panel15.AddChild(new FaceUI.Entities.Paragraph.$ctor2("Hidden text input:"));
                        var hiddenText = new FaceUI.Entities.TextInput.$ctor1(false);
                        hiddenText.PlaceholderText = "Enter password..";
                        hiddenText.HideInputWithChar = 42;
                        panel15.AddChild(hiddenText);
                        var hideCheckbox = new FaceUI.Entities.CheckBox.$ctor1("Hide password", 9, void 0, void 0, true);
                        hideCheckbox.OnValueChange = Bridge.fn.combine(hideCheckbox.OnValueChange, function (ent) {
                            if (hideCheckbox.Checked) {
                                hiddenText.HideInputWithChar = 42;
                            } else {
                                hiddenText.HideInputWithChar = null;
                            }
                        });
                        panel15.AddChild(hideCheckbox);
                    }

                    // example: tooltip text
                    {
                        // create panel and add to list of panels and manager
                        var panel16 = new FaceUI.Entities.Panel.$ctor1(new Microsoft.Xna.Framework.Vector2.$ctor2(450, -1));
                        this.panels.add(panel16);
                        userInterface.AddEntity(panel16);

                        // text input example
                        panel16.AddChild(new FaceUI.Entities.Header.$ctor1("Tooltip Text"));
                        panel16.AddChild(new FaceUI.Entities.HorizontalLine.ctor());

                        // add entity with tooltip text
                        panel16.AddChild(new FaceUI.Entities.Paragraph.$ctor2("You can attach tooltip text to entities.\nThis text will be shown when the user points on the entity for few seconds. \n\nFor example, try to point on this button:"));
                        var btn1 = new FaceUI.Entities.Button.$ctor1("Button With Tooltip");
                        btn1.ToolTipText = "This is the button tooltip text!\nAnd yes, it can be multiline.";
                        panel16.AddChild(btn1);
                        panel16.AddChild(new FaceUI.Entities.Paragraph.$ctor2("Note that you can override the function that generates tooltip text entities if you want to create your own custom style."));
                    }

                    // example: locked text input
                    {
                        // create panel and add to list of panels and manager
                        var panel17 = new FaceUI.Entities.Panel.$ctor1(new Microsoft.Xna.Framework.Vector2.$ctor2(500, -1));
                        this.panels.add(panel17);
                        userInterface.AddEntity(panel17);

                        // text input example
                        panel17.AddChild(new FaceUI.Entities.Header.$ctor1("Locked Text Input"));
                        panel17.AddChild(new FaceUI.Entities.HorizontalLine.ctor());

                        // inliner
                        panel17.AddChild(new FaceUI.Entities.Paragraph.$ctor2("A locked multiline text is a cool trick to create long, scrollable text:"));
                        var textMulti1 = new FaceUI.Entities.TextInput.$ctor2(true, new Microsoft.Xna.Framework.Vector2.$ctor2(0, 370));
                        textMulti1.Locked = true;
                        textMulti1.TextParagraph.Scale = 0.6;
                        textMulti1.Value = "The Cleric, Priest, or Bishop is a character class in Dungeons & Dragons and other fantasy role-playing games. \n\nThe cleric is a healer, usually a priest and a holy warrior, originally modeled on or inspired by the Military Orders. \nClerics are usually members of religious orders, with the original intent being to portray soldiers of sacred orders who have magical abilities, although this role was later taken more clearly by the paladin. \n\nMost clerics have powers to heal wounds, protect their allies and sometimes resurrect the dead, as well as summon, manipulate and banish undead.\n\nA description of Priests and Priestesses from the Nethack guidebook: Priests and Priestesses are clerics militant, crusaders advancing the cause of righteousness with arms, armor, and arts thaumaturgic. Their ability to commune with deities via prayer occasionally extricates them from peril, but can also put them in it.[1]\n\nA common feature of clerics across many games is that they may not equip pointed weapons such as swords or daggers, and must use blunt weapons such as maces, war-hammers, shields or wand instead. This is based on a popular, but erroneous, interpretation of the depiction of Odo of Bayeux and accompanying text. They are also often limited in what types of armor they can wear, though usually not as restricted as mages.\n\nRelated to the cleric is the paladin, who is typically a Lawful Good[citation needed] warrior often aligned with a religious order, and who uses their martial skills to advance its holy cause.";
                        panel17.AddChild(textMulti1);
                    }

                    // example: panel tabs
                    {
                        // create panel and add to list of panels and manager
                        var panel18 = new FaceUI.Entities.Panel.$ctor1(new Microsoft.Xna.Framework.Vector2.$ctor2(540, 440), FaceUI.Entities.PanelSkin.None, 0, void 0);
                        this.panels.add(panel18);
                        userInterface.AddEntity(panel18);

                        // create panel tabs
                        var tabs = new FaceUI.Entities.PanelTabs();
                        tabs.BackgroundSkin = FaceUI.Entities.PanelSkin.Default;
                        panel18.AddChild(tabs);

                        // add first panel
                        {
                            var tab = tabs.AddTab("Tab 1");
                            tab.panel.AddChild(new FaceUI.Entities.Header.$ctor1("PanelTabs"));
                            tab.panel.AddChild(new FaceUI.Entities.HorizontalLine.ctor());
                            tab.panel.AddChild(new FaceUI.Entities.Paragraph.$ctor2("PanelTab creates a group of internal panels with toggle buttons to switch between them.\n\nChoose a tab in the buttons above for more info..."));
                        }

                        // add second panel
                        {
                            var tab1 = tabs.AddTab("Tab 2");
                            tab1.panel.AddChild(new FaceUI.Entities.Header.$ctor1("Tab 2"));
                            tab1.panel.AddChild(new FaceUI.Entities.HorizontalLine.ctor());
                            tab1.panel.AddChild(new FaceUI.Entities.Paragraph.$ctor2("Awesome, you got to tab2!\n\nMaybe something interesting in tab3?"));
                        }

                        // add third panel
                        {
                            var tab2 = tabs.AddTab("Tab 3");
                            tab2.panel.AddChild(new FaceUI.Entities.Header.$ctor1("Nope."));
                            tab2.panel.AddChild(new FaceUI.Entities.HorizontalLine.ctor());
                            tab2.panel.AddChild(new FaceUI.Entities.Paragraph.$ctor2("Nothing to see here."));
                        }
                    }

                    // example: messages
                    {
                        // create panel and add to list of panels and manager
                        var panel19 = new FaceUI.Entities.Panel.$ctor1(new Microsoft.Xna.Framework.Vector2.$ctor2(450, -1));
                        this.panels.add(panel19);
                        userInterface.AddEntity(panel19);

                        // add title and text
                        panel19.AddChild(new FaceUI.Entities.Header.$ctor1("Message Box"));
                        panel19.AddChild(new FaceUI.Entities.HorizontalLine.ctor());
                        panel19.AddChild(new FaceUI.Entities.Paragraph.$ctor2("GeonBit.UI comes with a utility to create simple message boxes:"));

                        // button to create simple message box
                        {
                            var btn2 = new FaceUI.Entities.Button.$ctor1("Show Simple Message", FaceUI.Entities.ButtonSkin.Default);
                            btn2.OnClick = Bridge.fn.combine(btn2.OnClick, $asm.$.MyONez.Base.Screens.UIScene.f5);
                            panel19.AddChild(btn2);
                        }

                        // button to create message box with custombuttons
                        panel19.AddChild(new FaceUI.Entities.Paragraph.$ctor2("Or you can create custom message and buttons:"));
                        {
                            var btn3 = new FaceUI.Entities.Button.$ctor1("Show Custom Message", FaceUI.Entities.ButtonSkin.Default);
                            btn3.OnClick = Bridge.fn.combine(btn3.OnClick, $asm.$.MyONez.Base.Screens.UIScene.f8);
                            panel19.AddChild(btn3);
                        }

                        // button to create message with extras
                        panel19.AddChild(new FaceUI.Entities.Paragraph.$ctor2("And you can also add extra entities to the message box:"));
                        {
                            var btn4 = new FaceUI.Entities.Button.$ctor1("Message With Extras", FaceUI.Entities.ButtonSkin.Default);
                            btn4.OnClick = Bridge.fn.combine(btn4.OnClick, $asm.$.MyONez.Base.Screens.UIScene.f9);
                            panel19.AddChild(btn4);
                        }
                    }

                    // example: forms
                    {
                        // create panel and add to list of panels and manager
                        var panel20 = new FaceUI.Entities.Panel.$ctor1(new Microsoft.Xna.Framework.Vector2.$ctor2(560, -1));
                        this.panels.add(panel20);
                        userInterface.AddEntity(panel20);

                        // add title and text
                        panel20.AddChild(new FaceUI.Entities.Header.$ctor1("UI Forms"));
                        panel20.AddChild(new FaceUI.Entities.HorizontalLine.ctor());
                        panel20.AddChild(new FaceUI.Entities.Paragraph.$ctor2("Forms are objects that help you generate form-like UI groups and easily extract the data of different fields. For example click the button below: \n                    "));

                        // add create form button
                        var btn5 = panel20.AddChild(new FaceUI.Entities.Button.$ctor1("Show Form"));
                        btn5.OnClick = Bridge.fn.combine(btn5.OnClick, $asm.$.MyONez.Base.Screens.UIScene.f10);
                    }

                    // example: file menu
                    {
                        // create panel and add to list of panels and manager
                        var panel21 = new FaceUI.Entities.Panel.$ctor1(new Microsoft.Xna.Framework.Vector2.$ctor2(750, -1));
                        this.panels.add(panel21);
                        userInterface.AddEntity(panel21);

                        // add title and text
                        panel21.AddChild(new FaceUI.Entities.Header.$ctor1("File Menu"));
                        panel21.AddChild(new FaceUI.Entities.HorizontalLine.ctor());
                        panel21.AddChild(new FaceUI.Entities.Paragraph.$ctor2("GeonBit.UI comes with a utility to generate a classic file menu:"));

                        var layout = new FaceUI.Utils.SimpleFileMenu.MenuLayout();
                        layout.AddMenu("File", 260);
                        layout.AddItemToMenu("File", "New", $asm.$.MyONez.Base.Screens.UIScene.f11);
                        layout.AddItemToMenu("File", "Save", $asm.$.MyONez.Base.Screens.UIScene.f12);
                        layout.AddItemToMenu("File", "Load", $asm.$.MyONez.Base.Screens.UIScene.f13);
                        layout.AddItemToMenu("File", "Exit", $asm.$.MyONez.Base.Screens.UIScene.f14);
                        layout.AddMenu("Display", 260);
                        layout.AddItemToMenu("Display", "Zoom In", function () {
                            userInterface.GlobalScale += 0.1;
                        });
                        layout.AddItemToMenu("Display", "Zoom Out", function () {
                            userInterface.GlobalScale -= 0.1;
                        });
                        layout.AddItemToMenu("Display", "Reset Zoom", function () {
                            userInterface.GlobalScale = 1.0;
                        });
                        var fileMenu = FaceUI.Utils.SimpleFileMenu.Create(layout);
                        fileMenu.Anchor = FaceUI.Entities.Anchor.Auto;
                        panel21.AddChild(fileMenu);
                        panel21.AddChild(new FaceUI.Entities.LineSpace.$ctor1(24));

                        panel21.AddChild(new FaceUI.Entities.Paragraph.$ctor2("Usually this menu should cover the top of the screen and not be inside another panel. Note that like most entities in GeonBit.UI, you can also set its skin:"));
                        fileMenu = FaceUI.Utils.SimpleFileMenu.Create(layout, FaceUI.Entities.PanelSkin.Fancy);
                        fileMenu.Anchor = FaceUI.Entities.Anchor.Auto;
                        panel21.AddChild(fileMenu);
                    }

                    // example: disabled
                    {
                        // create panel and add to list of panels and manager
                        var panel22 = new FaceUI.Entities.Panel.$ctor1(new Microsoft.Xna.Framework.Vector2.$ctor2(480, 580));
                        panel22.Enabled = false;
                        this.panels.add(panel22);
                        userInterface.AddEntity(panel22);

                        // disabled title
                        panel22.AddChild(new FaceUI.Entities.Header.$ctor1("Disabled"));
                        panel22.AddChild(new FaceUI.Entities.HorizontalLine.ctor());
                        panel22.AddChild(new FaceUI.Entities.Paragraph.$ctor2("Entities can be disabled:"));

                        // internal panel
                        var panel2 = new FaceUI.Entities.Panel.$ctor1(Microsoft.Xna.Framework.Vector2.Zero.$clone(), FaceUI.Entities.PanelSkin.None, FaceUI.Entities.Anchor.Auto);
                        panel2.Padding = Microsoft.Xna.Framework.Vector2.Zero.$clone();
                        panel22.AddChild(panel2);
                        panel2.AddChild(new FaceUI.Entities.Button.$ctor1("button"));

                        panel2.AddChild(new FaceUI.Entities.LineSpace.ctor());
                        for (var i1 = 0; i1 < 6; i1 = (i1 + 1) | 0) {
                            panel2.AddChild(new FaceUI.Entities.Icon.$ctor1(i1, FaceUI.Entities.Anchor.AutoInline, 1, true));
                        }
                        panel2.AddChild(new FaceUI.Entities.Paragraph.$ctor2("\nDisabled entities are drawn in black & white, and you cannot interact with them.."));

                        var list3 = new FaceUI.Entities.SelectList.$ctor2(new Microsoft.Xna.Framework.Vector2.$ctor2(0, 130));
                        list3.AddItem("Warrior");
                        list3.AddItem("Mage");
                        panel2.AddChild(list3);
                        panel2.AddChild(new FaceUI.Entities.CheckBox.$ctor1("disabled.."));
                    }

                    // example: Locked
                    {
                        // create panel and add to list of panels and manager
                        var panel23 = new FaceUI.Entities.Panel.$ctor1(new Microsoft.Xna.Framework.Vector2.$ctor2(520, 610));
                        this.panels.add(panel23);
                        userInterface.AddEntity(panel23);

                        // locked title
                        panel23.AddChild(new FaceUI.Entities.Header.$ctor1("Locked"));
                        panel23.AddChild(new FaceUI.Entities.HorizontalLine.ctor());
                        panel23.AddChild(new FaceUI.Entities.Paragraph.$ctor2("Entities can also be locked:", FaceUI.Entities.Anchor.Auto));

                        var panel21 = new FaceUI.Entities.Panel.$ctor1(Microsoft.Xna.Framework.Vector2.Zero.$clone(), FaceUI.Entities.PanelSkin.None, FaceUI.Entities.Anchor.Auto);
                        panel21.Padding = Microsoft.Xna.Framework.Vector2.Zero.$clone();
                        panel21.Locked = true;

                        panel23.AddChild(panel21);
                        panel21.AddChild(new FaceUI.Entities.Button.$ctor1("button"));
                        panel21.AddChild(new FaceUI.Entities.LineSpace.ctor());

                        for (var i2 = 0; i2 < 6; i2 = (i2 + 1) | 0) {
                            panel21.AddChild(new FaceUI.Entities.Icon.$ctor1(i2, FaceUI.Entities.Anchor.AutoInline, 1, true));
                        }
                        panel21.AddChild(new FaceUI.Entities.Paragraph.$ctor2("\nLocked entities will not respond to input, but unlike disabled entities they are drawn normally, eg with colors:"));

                        var list4 = new FaceUI.Entities.SelectList.$ctor2(new Microsoft.Xna.Framework.Vector2.$ctor2(0, 130));
                        list4.AddItem("Warrior");
                        list4.AddItem("Mage");
                        panel21.AddChild(list4);
                        panel21.AddChild(new FaceUI.Entities.CheckBox.$ctor1("locked.."));
                    }

                    // example: Cursors
                    {
                        // create panel and add to list of panels and manager
                        var panel24 = new FaceUI.Entities.Panel.$ctor1(new Microsoft.Xna.Framework.Vector2.$ctor2(450, -1));
                        this.panels.add(panel24);
                        userInterface.AddEntity(panel24);

                        // add title and text
                        panel24.AddChild(new FaceUI.Entities.Header.$ctor1("Cursor"));
                        panel24.AddChild(new FaceUI.Entities.HorizontalLine.ctor());
                        panel24.AddChild(new FaceUI.Entities.Paragraph.$ctor2("GeonBit.UI comes with 3 basic cursor types:"));

                        // default cursor show
                        {
                            var btn6 = new FaceUI.Entities.Button.$ctor1("Default", FaceUI.Entities.ButtonSkin.Default);
                            btn6.OnMouseEnter = function (entity4) {
                                userInterface.SetCursor(FaceUI.CursorType.Default);
                            };
                            btn6.OnMouseLeave = function (entity4) {
                                userInterface.SetCursor(FaceUI.CursorType.Default);
                            };
                            panel24.AddChild(btn6);
                        }

                        // pointer cursor show
                        {
                            var btn7 = new FaceUI.Entities.Button.$ctor1("Pointer", FaceUI.Entities.ButtonSkin.Default);
                            btn7.OnMouseEnter = function (entity4) {
                                userInterface.SetCursor(FaceUI.CursorType.Pointer);
                            };
                            btn7.OnMouseLeave = function (entity4) {
                                userInterface.SetCursor(FaceUI.CursorType.Default);
                            };
                            panel24.AddChild(btn7);
                        }

                        // ibeam cursor show
                        {
                            var btn8 = new FaceUI.Entities.Button.$ctor1("IBeam", FaceUI.Entities.ButtonSkin.Default);
                            btn8.OnMouseEnter = function (entity4) {
                                userInterface.SetCursor(FaceUI.CursorType.IBeam);
                            };
                            btn8.OnMouseLeave = function (entity4) {
                                userInterface.SetCursor(FaceUI.CursorType.Default);
                            };
                            panel24.AddChild(btn8);
                        }

                        panel24.AddChild(new FaceUI.Entities.Paragraph.$ctor2("And as always, you can also set your own custom cursor:"));
                        {
                            var btn9 = new FaceUI.Entities.Button.$ctor1("Custom", FaceUI.Entities.ButtonSkin.Default);
                            btn9.OnMouseEnter = Bridge.fn.bind(this, function (entity4) {
                                userInterface.SetCursor$1(this.Content.Load(Microsoft.Xna.Framework.Graphics.Texture2D, "example/cursor"), 40);
                            });
                            btn9.OnMouseLeave = function (entity4) {
                                userInterface.SetCursor(FaceUI.CursorType.Default);
                            };
                            panel24.AddChild(btn9);
                        }

                    }

                    // example: Misc
                    {
                        // create panel and add to list of panels and manager
                        var panel25 = new FaceUI.Entities.Panel.$ctor1(new Microsoft.Xna.Framework.Vector2.$ctor2(530, -1));
                        this.panels.add(panel25);
                        userInterface.AddEntity(panel25);

                        // misc title
                        panel25.AddChild(new FaceUI.Entities.Header.$ctor1("Miscellaneous"));
                        panel25.AddChild(new FaceUI.Entities.HorizontalLine.ctor());
                        panel25.AddChild(new FaceUI.Entities.Paragraph.$ctor2("Some cool tricks you can do:"));

                        // button with icon
                        var btn10 = new FaceUI.Entities.Button.$ctor1("Button With Icon");
                        btn10.ButtonParagraph.SetAnchorAndOffset(FaceUI.Entities.Anchor.CenterLeft, new Microsoft.Xna.Framework.Vector2.$ctor2(60, 0));
                        btn10.AddChild(new FaceUI.Entities.Icon.$ctor1(FaceUI.Entities.IconType.Book, FaceUI.Entities.Anchor.CenterLeft), true);
                        panel25.AddChild(btn10);

                        // change progressbar color
                        panel25.AddChild(new FaceUI.Entities.Paragraph.$ctor2("Different ProgressBar colors:"));
                        var pb = new FaceUI.Entities.ProgressBar.ctor();
                        pb.ProgressFill.FillColor = Microsoft.Xna.Framework.Color.Red.$clone();
                        pb.Caption.Text = "Optional caption...";
                        panel25.AddChild(pb);

                        // paragraph style with mouse
                        panel25.AddChild(new FaceUI.Entities.LineSpace.ctor());
                        panel25.AddChild(new FaceUI.Entities.HorizontalLine.ctor());
                        var paragraph1 = new FaceUI.Entities.Paragraph.$ctor2("Hover / click styling..");
                        paragraph1.SetStyleProperty("FillColor", new FaceUI.DataTypes.StyleProperty.$ctor1(Microsoft.Xna.Framework.Color.Purple.$clone()), FaceUI.Entities.EntityState.MouseDown);
                        paragraph1.SetStyleProperty("FillColor", new FaceUI.DataTypes.StyleProperty.$ctor1(Microsoft.Xna.Framework.Color.Red.$clone()), FaceUI.Entities.EntityState.MouseHover);
                        panel25.AddChild(paragraph1);
                        panel25.AddChild(new FaceUI.Entities.HorizontalLine.ctor());

                        // colored rectangle
                        panel25.AddChild(new FaceUI.Entities.Paragraph.$ctor2("Colored rectangle:"));
                        var rect = new FaceUI.Entities.ColoredRectangle.$ctor3(Microsoft.Xna.Framework.Color.Blue.$clone(), Microsoft.Xna.Framework.Color.Red.$clone(), 4, new Microsoft.Xna.Framework.Vector2.$ctor2(0, 40));
                        panel25.AddChild(rect);
                        panel25.AddChild(new FaceUI.Entities.HorizontalLine.ctor());

                        // custom icons
                        panel25.AddChild(new FaceUI.Entities.Paragraph.$ctor2("Custom icons / images:"));
                        var icon1 = new FaceUI.Entities.Icon.$ctor1(FaceUI.Entities.IconType.None, FaceUI.Entities.Anchor.AutoInline, 1, true, new Microsoft.Xna.Framework.Vector2.$ctor2(12, 10));
                        icon1.Texture = this.Content.Load(Microsoft.Xna.Framework.Graphics.Texture2D, "example/warrior");
                        panel25.AddChild(icon1);
                        icon1 = new FaceUI.Entities.Icon.$ctor1(FaceUI.Entities.IconType.None, FaceUI.Entities.Anchor.AutoInline, 1, true, new Microsoft.Xna.Framework.Vector2.$ctor2(12, 10));
                        icon1.Texture = this.Content.Load(Microsoft.Xna.Framework.Graphics.Texture2D, "example/monk");
                        panel25.AddChild(icon1);
                        icon1 = new FaceUI.Entities.Icon.$ctor1(FaceUI.Entities.IconType.None, FaceUI.Entities.Anchor.AutoInline, 1, true, new Microsoft.Xna.Framework.Vector2.$ctor2(12, 10));
                        icon1.Texture = this.Content.Load(Microsoft.Xna.Framework.Graphics.Texture2D, "example/mage");
                        panel25.AddChild(icon1);
                    }

                    // example: character build page - intro
                    {
                        // create panel and add to list of panels and manager
                        var panel26 = new FaceUI.Entities.Panel.$ctor1(new Microsoft.Xna.Framework.Vector2.$ctor2(500, -1));
                        this.panels.add(panel26);
                        userInterface.AddEntity(panel26);

                        // add title and text
                        panel26.AddChild(new FaceUI.Entities.Header.$ctor1("Final Example"));
                        panel26.AddChild(new FaceUI.Entities.HorizontalLine.ctor());
                        panel26.AddChild(new FaceUI.Entities.Paragraph.$ctor2("The next example will show a fully-functional character creation page, that use different entities, events, etc.\n\nClick on 'Next' to see the character creation demo."));
                    }

                    // example: character build page - final
                    {
                        var panelWidth = 730;

                        // create panel and add to list of panels and manager
                        var panel27 = new FaceUI.Entities.Panel.$ctor1(new Microsoft.Xna.Framework.Vector2.$ctor2(panelWidth, -1));
                        this.panels.add(panel27);
                        userInterface.AddEntity(panel27);

                        // add title and text
                        panel27.AddChild(new FaceUI.Entities.Header.$ctor1("Create New Character"));
                        panel27.AddChild(new FaceUI.Entities.HorizontalLine.ctor());

                        // create an internal panel to align components better - a row that covers the entire width split into 3 columns (left, center, right)
                        // first the container panel
                        var entitiesGroup = new FaceUI.Entities.Panel.$ctor1(new Microsoft.Xna.Framework.Vector2.$ctor2(0, 250), FaceUI.Entities.PanelSkin.None, FaceUI.Entities.Anchor.Auto);
                        entitiesGroup.Padding = Microsoft.Xna.Framework.Vector2.Zero.$clone();
                        panel27.AddChild(entitiesGroup);

                        // create grid
                        var columnPanels = FaceUI.Utils.PanelsGrid.GenerateColums$1(3, entitiesGroup);
                        $t1 = Bridge.getEnumerator(columnPanels);
                        try {
                            while ($t1.moveNext()) {
                                var column = $t1.Current;
                                column.Padding = Microsoft.Xna.Framework.Vector2.Zero.$clone();
                            }
                        } finally {
                            if (Bridge.is($t1, System.IDisposable)) {
                                $t1.System$IDisposable$Dispose();
                            }
                        }
                        var leftPanel = columnPanels[System.Array.index(0, columnPanels)];
                        var centerPanel = columnPanels[System.Array.index(1, columnPanels)];
                        var rightPanel = columnPanels[System.Array.index(2, columnPanels)];

                        // create a character preview panel
                        centerPanel.AddChild(new FaceUI.Entities.Label.$ctor1("Preview", FaceUI.Entities.Anchor.AutoCenter));
                        var charPreviewPanel = new FaceUI.Entities.Panel.$ctor1(new Microsoft.Xna.Framework.Vector2.$ctor2(180, 180), FaceUI.Entities.PanelSkin.Simple, FaceUI.Entities.Anchor.AutoCenter);
                        charPreviewPanel.Padding = Microsoft.Xna.Framework.Vector2.Zero.$clone();
                        centerPanel.AddChild(charPreviewPanel);

                        // create preview pics of character
                        var previewImage = new FaceUI.Entities.Image.$ctor1(this.Content.Load(Microsoft.Xna.Framework.Graphics.Texture2D, "example/warrior"), Microsoft.Xna.Framework.Vector2.Zero.$clone(), 0, FaceUI.Entities.Anchor.Center, void 0);
                        var previewImageColor = new FaceUI.Entities.Image.$ctor1(this.Content.Load(Microsoft.Xna.Framework.Graphics.Texture2D, "example/warrior_color"), Microsoft.Xna.Framework.Vector2.Zero.$clone(), 0, FaceUI.Entities.Anchor.Center, void 0);
                        var previewImageSkin = new FaceUI.Entities.Image.$ctor1(this.Content.Load(Microsoft.Xna.Framework.Graphics.Texture2D, "example/warrior_skin"), Microsoft.Xna.Framework.Vector2.Zero.$clone(), 0, FaceUI.Entities.Anchor.Center, void 0);
                        charPreviewPanel.AddChild(previewImage);
                        charPreviewPanel.AddChild(previewImageColor);
                        charPreviewPanel.AddChild(previewImageSkin);

                        // add skin tone slider
                        var skin = new FaceUI.Entities.Slider.$ctor2(0, 10, new Microsoft.Xna.Framework.Vector2.$ctor2(0, -1), FaceUI.Entities.SliderSkin.Default, FaceUI.Entities.Anchor.Auto);
                        skin.OnValueChange = function (entity4) {
                            var slider = Bridge.cast(entity4, FaceUI.Entities.Slider);
                            var alpha = Bridge.Int.clip32(slider.GetValueAsPercent() * 255);
                            previewImageSkin.FillColor = new Microsoft.Xna.Framework.Color.$ctor7(60, 32, 25, alpha);
                        };
                        skin.Value = 5;
                        charPreviewPanel.AddChild(skin);

                        // create the class selection list
                        leftPanel.AddChild(new FaceUI.Entities.Label.$ctor1("Class", FaceUI.Entities.Anchor.AutoCenter));
                        var classTypes = new FaceUI.Entities.SelectList.$ctor2(new Microsoft.Xna.Framework.Vector2.$ctor2(0, 208), FaceUI.Entities.Anchor.Auto);
                        classTypes.AddItem("Warrior");
                        classTypes.AddItem("Mage");
                        classTypes.AddItem("Ranger");
                        classTypes.AddItem("Monk");
                        classTypes.SelectedIndex = 0;
                        leftPanel.AddChild(classTypes);
                        classTypes.OnValueChange = Bridge.fn.bind(this, function (entity4) {
                            var texture = Bridge.cast((entity4), FaceUI.Entities.SelectList).SelectedValue.toLowerCase();
                            previewImage.Texture = this.Content.Load(Microsoft.Xna.Framework.Graphics.Texture2D, "example/" + (texture || ""));
                            previewImageColor.Texture = this.Content.Load(Microsoft.Xna.Framework.Graphics.Texture2D, "example/" + (texture || "") + "_color");
                            previewImageSkin.Texture = this.Content.Load(Microsoft.Xna.Framework.Graphics.Texture2D, "example/" + (texture || "") + "_skin");
                        });

                        // create color selection buttons
                        rightPanel.AddChild(new FaceUI.Entities.Label.$ctor1("Color", FaceUI.Entities.Anchor.AutoCenter));
                        var colors = System.Array.init([
                            Microsoft.Xna.Framework.Color.White.$clone(), 
                            Microsoft.Xna.Framework.Color.Red.$clone(), 
                            Microsoft.Xna.Framework.Color.Green.$clone(), 
                            Microsoft.Xna.Framework.Color.Blue.$clone(), 
                            Microsoft.Xna.Framework.Color.Yellow.$clone(), 
                            Microsoft.Xna.Framework.Color.Purple.$clone(), 
                            Microsoft.Xna.Framework.Color.Cyan.$clone(), 
                            Microsoft.Xna.Framework.Color.Brown.$clone(), 
                            Microsoft.Xna.Framework.Color.Orange.$clone()
                        ], Microsoft.Xna.Framework.Color);
                        var colorPickSize = 24;
                        $t2 = Bridge.getEnumerator(colors);
                        try {
                            while ($t2.moveNext()) {
                                var baseColor = $t2.Current.$clone();
                                for (var i3 = 0; i3 < 9; i3 = (i3 + 1) | 0) {
                                    var color = Microsoft.Xna.Framework.Color.op_Multiply(baseColor.$clone(), (1.0 - (Bridge.Int.mul(i3, 2) / 16.0)));
                                    color.A = 255;
                                    var currColorButton = new FaceUI.Entities.ColoredRectangle.$ctor2(color.$clone(), Microsoft.Xna.Framework.Vector2.op_Multiply$1(Microsoft.Xna.Framework.Vector2.One.$clone(), colorPickSize), i3 === 0 ? FaceUI.Entities.Anchor.Auto : FaceUI.Entities.Anchor.AutoInlineNoBreak);
                                    currColorButton.Padding = ($t3 = ($t4 = Microsoft.Xna.Framework.Vector2.Zero.$clone(), currColorButton.SpaceBefore = $t4.$clone(), $t4), currColorButton.SpaceAfter = $t3.$clone(), $t3);
                                    currColorButton.OnClick = function (entity4) {
                                        previewImageColor.FillColor = entity4.FillColor.$clone();
                                    };
                                    rightPanel.AddChild(currColorButton);
                                }
                            }
                        } finally {
                            if (Bridge.is($t2, System.IDisposable)) {
                                $t2.System$IDisposable$Dispose();
                            }
                        }

                        // gender selection (radio buttons)
                        panel27.AddChild(new FaceUI.Entities.RadioButton.$ctor1("Male", FaceUI.Entities.Anchor.Auto, new Microsoft.Xna.Framework.Vector2.$ctor2(180, 60), void 0, true));
                        panel27.AddChild(new FaceUI.Entities.RadioButton.$ctor1("Female", FaceUI.Entities.Anchor.AutoInline, new Microsoft.Xna.Framework.Vector2.$ctor2(240, 60)));

                        // hardcore mode
                        var hardcore = new FaceUI.Entities.Button.$ctor1("Hardcore", FaceUI.Entities.ButtonSkin.Fancy, FaceUI.Entities.Anchor.AutoInline, new Microsoft.Xna.Framework.Vector2.$ctor2(220, 60));
                        hardcore.ButtonParagraph.Scale = 0.8;
                        hardcore.SpaceBefore = new Microsoft.Xna.Framework.Vector2.$ctor2(24, 0);
                        hardcore.ToggleMode = true;
                        panel27.AddChild(hardcore);
                        panel27.AddChild(new FaceUI.Entities.HorizontalLine.ctor());

                        // add character name, last name, and age
                        // first add the labels
                        panel27.AddChild(new FaceUI.Entities.Label.$ctor1("First Name: ", FaceUI.Entities.Anchor.AutoInline, new Microsoft.Xna.Framework.Vector2.$ctor2(0.4, -1), void 0));
                        panel27.AddChild(new FaceUI.Entities.Label.$ctor1("Last Name: ", FaceUI.Entities.Anchor.AutoInline, new Microsoft.Xna.Framework.Vector2.$ctor2(0.4, -1), void 0));
                        panel27.AddChild(new FaceUI.Entities.Label.$ctor1("Age: ", FaceUI.Entities.Anchor.AutoInline, new Microsoft.Xna.Framework.Vector2.$ctor2(0.2, -1), void 0));

                        // now add the text inputs

                        // first name
                        var firstName = new FaceUI.Entities.TextInput.$ctor2(false, new Microsoft.Xna.Framework.Vector2.$ctor2(0.4, -1), FaceUI.Entities.Anchor.Auto, void 0, 4);
                        firstName.PlaceholderText = "Name";
                        firstName.Validators.add(new FaceUI.Entities.TextValidators.TextValidatorEnglishCharsOnly.$ctor1(true));
                        firstName.Validators.add(new FaceUI.Entities.TextValidators.OnlySingleSpaces());
                        firstName.Validators.add(new FaceUI.Entities.TextValidators.TextValidatorMakeTitle());
                        panel27.AddChild(firstName);

                        // last name
                        var lastName = new FaceUI.Entities.TextInput.$ctor2(false, new Microsoft.Xna.Framework.Vector2.$ctor2(0.4, -1), FaceUI.Entities.Anchor.AutoInline, void 0, 4);
                        lastName.PlaceholderText = "Surname";
                        lastName.Validators.add(new FaceUI.Entities.TextValidators.TextValidatorEnglishCharsOnly.$ctor1(true));
                        lastName.Validators.add(new FaceUI.Entities.TextValidators.OnlySingleSpaces());
                        lastName.Validators.add(new FaceUI.Entities.TextValidators.TextValidatorMakeTitle());
                        panel27.AddChild(lastName);

                        // age
                        var age = new FaceUI.Entities.TextInput.$ctor2(false, new Microsoft.Xna.Framework.Vector2.$ctor2(0.2, -1), FaceUI.Entities.Anchor.AutoInline, void 0, 4);
                        age.Validators.add(new FaceUI.Entities.TextValidators.TextValidatorNumbersOnly.$ctor1(false, 0, 80));
                        age.Value = "20";
                        age.ValueWhenEmpty = "20";
                        panel27.AddChild(age);
                    }

                    // example: epilogue
                    {
                        // create panel and add to list of panels and manager
                        var panel28 = new FaceUI.Entities.Panel.$ctor1(new Microsoft.Xna.Framework.Vector2.$ctor2(520, 400));
                        this.panels.add(panel28);
                        userInterface.AddEntity(panel28);

                        // add title and text
                        panel28.AddChild(new FaceUI.Entities.Header.$ctor1("End Of Demo"));
                        panel28.AddChild(new FaceUI.Entities.HorizontalLine.ctor());
                        panel28.AddChild(new FaceUI.Entities.Paragraph.$ctor2("That's it for now! There is still much to learn about GeonBit.UI, but these examples were enough to get you going.\n\nTo learn more, please visit the git repo, read the docs, or go through some source code.\n\nIf you liked GeonBit.UI feel free to star the repo on GitHub. :)"));
                    }

                    // init panels and buttons
                    this.UpdateAfterExampleChange();

                }

                // once done init, clear events log
                eventsLog.ClearItems();

                return userInterface;
            },
            /**
             * Show next UI example.
             *
             * @instance
             * @public
             * @this MyONez.Base.Screens.UIScene
             * @memberof MyONez.Base.Screens.UIScene
             * @return  {void}
             */
            NextExample: function () {
                this.currExample = (this.currExample + 1) | 0;
                this.UpdateAfterExampleChange();
            },
            /**
             * Show previous UI example.
             *
             * @instance
             * @public
             * @this MyONez.Base.Screens.UIScene
             * @memberof MyONez.Base.Screens.UIScene
             * @return  {void}
             */
            PreviousExample: function () {
                this.currExample = (this.currExample - 1) | 0;
                this.UpdateAfterExampleChange();
            },
            /**
             * Called after we change current example index, to hide all examples
             except for the currently active example + disable prev / next buttons if
             needed (if first or last example).
             *
             * @instance
             * @protected
             * @this MyONez.Base.Screens.UIScene
             * @memberof MyONez.Base.Screens.UIScene
             * @return  {void}
             */
            UpdateAfterExampleChange: function () {
                var $t;
                // hide all panels and show current example panel
                $t = Bridge.getEnumerator(this.panels);
                try {
                    while ($t.moveNext()) {
                        var panel = $t.Current;
                        panel.Visible = false;
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }
                this.panels.getItem(this.currExample).Visible = true;

                // disable / enable next and previous buttons
                this.nextExampleButton.Enabled = this.currExample !== ((this.panels.Count - 1) | 0);
                this.previousExampleButton.Enabled = this.currExample !== 0;
            }
        }
    });

    Bridge.ns("MyONez.Base.Screens.UIScene", $asm.$);

    Bridge.apply($asm.$.MyONez.Base.Screens.UIScene, {
        f1: function (btn) {
            this.PreviousExample();
        },
        f2: function (btn) {
            this.NextExample();
        },
        f3: function (btn) {
            FaceUI.Utils.MessageBox.BuildMessageBox$1("Git Repo", "https://github.com/RonenNess/GeonBit.UI").Show();
        },
        f4: function (entity) {
            var list = Bridge.cast(entity, FaceUI.Entities.SelectList);
            if (list.Count > 100) {
                list.RemoveItem(0);
            }
        },
        f5: function (entity4) {
            FaceUI.Utils.MessageBox.BuildMessageBox$1("Hello World!", "This is a simple message box. It doesn't say much, really.").Show();
        },
        f6: function () {
            return true;
        },
        f7: function () {
            FaceUI.Utils.MessageBox.BuildMessageBox$1("Files Removed Successfully", "Win32 was successfully removed from this computer. Please restart to complete OS destruction.\n\n(Just kidding!)").Show();
            return true;
        },
        f8: function (entity4) {
            FaceUI.Utils.MessageBox.BuildMessageBox("Custom Message!", "In this message there are two custom buttons.\n\nYou can set different actions per button. For example, click on 'Surprise' and see what happens!", System.Array.init([new FaceUI.Utils.MessageBox.MsgBoxOption("Close", $asm.$.MyONez.Base.Screens.UIScene.f6), new FaceUI.Utils.MessageBox.MsgBoxOption("Surprise", $asm.$.MyONez.Base.Screens.UIScene.f7)], FaceUI.Utils.MessageBox.MsgBoxOption)).Show();
        },
        f9: function (entity4) {
            var textInput = new FaceUI.Entities.TextInput.$ctor1(false);
            textInput.PlaceholderText = "Enter your name";
            FaceUI.Utils.MessageBox.BuildMessageBox("Message With Extra!", "In this message box we attached an extra entity from outside (a simple text input).\n\nPretty neat, huh?", System.Array.init([new FaceUI.Utils.MessageBox.MsgBoxOption("Close", $asm.$.MyONez.Base.Screens.UIScene.f6)], FaceUI.Utils.MessageBox.MsgBoxOption), System.Array.init([textInput], FaceUI.Entities.TextInput)).Show();
        },
        f10: function (ent) {
            var $t1;
            var newForm = new FaceUI.Utils.Forms.Form(System.Array.init([($t1 = new FaceUI.Utils.Forms.FormFieldData(FaceUI.Utils.Forms.FormFieldType.TextInput, "text1", "Text Field"), $t1.DefaultValue = "Some Default Val", $t1), ($t1 = new FaceUI.Utils.Forms.FormFieldData(FaceUI.Utils.Forms.FormFieldType.Slider, "slider1", "Slider Field"), $t1.Min = 5, $t1.Max = 15, $t1.DefaultValue = Bridge.box(10, System.Int32), $t1), ($t1 = new FaceUI.Utils.Forms.FormFieldData(FaceUI.Utils.Forms.FormFieldType.RadioButtons, "radios1", "Radio Buttons Field"), $t1.Choices = System.Array.init(["option1", "option2"], System.String), $t1.DefaultValue = "option1", $t1), new FaceUI.Utils.Forms.FormFieldData(FaceUI.Utils.Forms.FormFieldType.Checkbox, "checkbox1", "Checkbox Field"), new FaceUI.Utils.Forms.FormFieldData(FaceUI.Utils.Forms.FormFieldType.Section, "newsection", "New Form Section"), ($t1 = new FaceUI.Utils.Forms.FormFieldData(FaceUI.Utils.Forms.FormFieldType.DropDown, "dropdown1", "DropDown field"), $t1.Choices = System.Array.init(["option1", "option2", "option3"], System.String), $t1)], FaceUI.Utils.Forms.FormFieldData), null);
            var msgBox = FaceUI.Utils.MessageBox.BuildMessageBox$1("Example Form", "", "Close Form And Show Values", void 0, System.Array.init([newForm.FormPanel], FaceUI.Entities.Panel));
            msgBox.OnDone = function (b) {
                FaceUI.Utils.MessageBox.BuildMessageBox$1("Form Values", System.String.format("Text Field: '{5}{0}{6}'\r\nSlider: '{5}{1}{6}'\r\nRadio Buttons: '{5}{2}{6}'\r\nCheckbox: '{5}{3}{6}'\r\nDropDown: '{5}{4}{6}'", newForm.GetValue("text1"), newForm.GetValue("slider1"), newForm.GetValue("radios1"), newForm.GetValue("checkbox1"), newForm.GetValue("dropdown1"), "{{L_GREEN}}", "{{DEFAULT}}")).Show();
            };
            msgBox.Show();
        },
        f11: function () {
            FaceUI.Utils.MessageBox.BuildMessageBox$1("Something New!", "Lets make something new.").Show();
        },
        f12: function () {
            FaceUI.Utils.MessageBox.BuildMessageBox$1("Something Saved!", "Your thing was saved successfully.").Show();
        },
        f13: function () {
            FaceUI.Utils.MessageBox.BuildMessageBox$1("Something Loaded!", "Your thing was loaded successfully.").Show();
        },
        f14: function () {
            FaceUI.Utils.MessageBox.BuildMessageBox$1("Not Yet", "We still have much to see.").Show();
        }
    });

    Bridge.define("PixelRPG.Base.Screens.ServerReceiveHandlerSystem.Handler$1", function (TMessage) { return {
        inherits: [PixelRPG.Base.Screens.ServerReceiveHandlerSystem.IHandler],
        $kind: "nested class",
        props: {
            MessageType: {
                get: function () {
                    return TMessage;
                }
            }
        },
        alias: [
            "MessageType", "PixelRPG$Base$Screens$ServerReceiveHandlerSystem$IHandler$MessageType",
            "Handle", "PixelRPG$Base$Screens$ServerReceiveHandlerSystem$IHandler$Handle"
        ],
        methods: {
            Handle: function (server, connectionKey, message) {
                this.Handle$1(server, connectionKey, Bridge.cast(Bridge.unbox(message, TMessage), TMessage));
            }
        }
    }; });

    Bridge.define("MyONez.Base.AdditionalStuff.Materials.WaterReflectionMaterial", {
        inherits: [SpineEngine.Graphics.Materials.Material$1(MyONez.Base.AdditionalStuff.Effects.WaterReflectionEffect)],
        fields: {
            renderTarget: null,
            RenderTexture: null
        },
        ctors: {
            ctor: function (reflectionRenderer) {
                this.$initialize();
                SpineEngine.Graphics.Materials.Material$1(MyONez.Base.AdditionalStuff.Effects.WaterReflectionEffect).$ctor1.call(this, SpineEngine.Core.Instance.Content.Load(MyONez.Base.AdditionalStuff.Effects.WaterReflectionEffect, MyONez.Base.AdditionalStuff.Effects.ReflectionEffect.EffectAssetName));
                this.RenderTexture = reflectionRenderer.RenderTexture;
            }
        },
        methods: {
            OnPreRender: function (camera, entity) {
                SpineEngine.Graphics.Materials.Material$1(MyONez.Base.AdditionalStuff.Effects.WaterReflectionEffect).prototype.OnPreRender.call(this, camera, entity);
                if (this.renderTarget == null || !Bridge.referenceEquals(this.renderTarget, this.RenderTexture.RenderTarget)) {
                    this.renderTarget = this.RenderTexture.RenderTarget;
                    this.TypedEffect.RenderTexture = this.RenderTexture.RenderTarget;
                }

                this.TypedEffect.MatrixTransform = camera.ViewProjectionMatrix.$clone();
                this.TypedEffect.CurrentTechnique = this.TypedEffect.Techniques.getItem$1("WaterReflectionTechnique");
            },
            Update: function (gameTime) {
                SpineEngine.Graphics.Materials.Material$1(MyONez.Base.AdditionalStuff.Effects.WaterReflectionEffect).prototype.Update.call(this, gameTime);
                this.TypedEffect.Time = gameTime.getTotalSeconds();
            }
        }
    });
});
