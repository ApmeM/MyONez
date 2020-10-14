namespace MyONez.PipelineImporter.Tiled.ImportModels
{
    using System.Collections.Generic;
    using System.Xml.Serialization;

    [XmlRoot( ElementName = "map" )]
    public class TmxMap
    {
        public TmxMap()
        {
            this.Properties = new List<TmxProperty>();
            this.TileSets = new List<TmxTileSet>();
            this.Layers = new List<TmxLayer>();
            this.ObjectGroups = new List<TmxObjectGroup>();
        }

        [XmlAttribute( AttributeName = "version" )]
        public string Version;

        [XmlAttribute( AttributeName = "orientation" )]
        public TmxOrientation Orientation;

        [XmlAttribute( AttributeName = "renderorder" )]
        public TmxRenderOrder RenderOrder;

        [XmlAttribute( AttributeName = "backgroundcolor" )]
        public string BackgroundColor;

        [XmlAttribute( AttributeName = "firstgid" )]
        public int FirstGid;

        [XmlAttribute( AttributeName = "width" )]
        public int Width;

        [XmlAttribute( AttributeName = "height" )]
        public int Height;

        [XmlAttribute( AttributeName = "tilewidth" )]
        public int TileWidth;

        [XmlAttribute( AttributeName = "tileheight" )]
        public int TileHeight;

        [XmlAttribute( "nextobjectid" )]
        public int NextObjectId;

        [XmlElement( ElementName = "tileset" )]
        public List<TmxTileSet> TileSets;

        [XmlElement( ElementName = "objectgroup" )]
        public List<TmxObjectGroup> ObjectGroups;

        [XmlElement( ElementName = "layer", Type = typeof( TmxTileLayer ) )]
        [XmlElement( ElementName = "imagelayer", Type = typeof( TmxImageLayer ) )]
        public List<TmxLayer> Layers;

        [XmlArray( "properties" )]
        [XmlArrayItem( "property" )]
        public List<TmxProperty> Properties;

        public string OriginalFileName { get; set; }
    }
}