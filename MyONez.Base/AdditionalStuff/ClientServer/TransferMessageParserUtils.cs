using System;

namespace MyONez.Base.AdditionalStuff.ClientServer
{
    public static partial class TransferMessageParserUtils
    {
        public static ITransferMessageParser[] AvailableParsers;

        public static ITransferMessageParser FindWriter(object transferModel, ITransferMessageParser[] parsers = null)
        {
            parsers = parsers ?? AvailableParsers;
            if (parsers == null)
            {
                throw new Exception(
                    @"Parsers list not initialized. You should either specify parsers parameter or run 
MyONez.CLI.exe generateserializers -d E:\projects\MyONez\MyONez.Base\bin\Debug\netstandard2.0\MyONez.Base.dll > E:\projects\MyONez\MyONez.Base\TransferMessages\Parsers.cs");
            }

            for (var j = 0; j < parsers.Length; j++)
            {
                if (parsers[j].IsWritable(transferModel))
                {
                    return parsers[j];
                }
            }

            return null;
        }

        public static ITransferMessageParser FindReader(string data, ITransferMessageParser[] parsers = null)
        {
            parsers = parsers ?? AvailableParsers;
            if (parsers == null)
            {
                throw new Exception(
                    @"Parsers list not initialized. You should either specify parsers parameter or run 
MyONez.CLI.exe generateserializers -d E:\projects\MyONez\MyONez.Base\bin\Debug\netstandard2.0\MyONez.Base.dll > E:\projects\MyONez\MyONez.Base\TransferMessages\Parsers.cs");
            }

            for (var j = 0; j < parsers.Length; j++)
            {
                if (parsers[j].IsReadable(data))
                {
                    return parsers[j];
                }
            }

            return null;
        }
    }
}
