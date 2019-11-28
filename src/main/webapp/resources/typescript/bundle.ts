import { Utils } from "./utils";
import { GenericFactory } from "./genericFactory";
import { JReact } from "./jreact";
import { RslComponents } from "./jreactWidget";

( window as any ).Utils = Utils;
( window as any ).GenericFactory = GenericFactory;
( window as any ).JReact = JReact;
( window as any ).CustomCombobox = RslComponents.CustomCombobox;
