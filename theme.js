import {
    MD3LightTheme as DefaultTheme,
    MD3DarkTheme as DarkDefaultTheme
} from 'react-native-paper';
import { configureFonts, } from 'react-native-paper';


const fontConfig = {
    fontFamily: "Inter-Black"
};
const theme = {
    ...DefaultTheme,
    roundness: 4,
    "skeletonbackground": "rgb(204, 204, 204)",
    "skeletonhighlight": "rgb(140, 140, 140)",
    "colors": {
        "skeletonbackground": "rgb(204, 204, 204)",
        "skeletonhighlight": "rgb(140, 140, 140)",
        "primary": "rgb(0, 94, 178)",
        "onPrimary": "rgb(255, 255, 255)",
        "primaryContainer": "rgb(213, 227, 255)",
        "onPrimaryContainer": "rgb(0, 27, 59)",
        "secondary": "rgb(85, 95, 113)",
        "onSecondary": "rgb(255, 255, 255)",
        "secondaryContainer": "rgb(217, 227, 248)",
        "onSecondaryContainer": "rgb(18, 28, 43)",
        "tertiary": "rgb(110, 86, 118)",
        "onTertiary": "rgb(255, 255, 255)",
        "tertiaryContainer": "rgb(248, 216, 254)",
        "onTertiaryContainer": "rgb(39, 19, 47)",
        "error": "rgb(186, 26, 26)",
        "onError": "rgb(255, 255, 255)",
        "errorContainer": "rgb(255, 218, 214)",
        "onErrorContainer": "rgb(65, 0, 2)",
        "background": "rgb(253, 251, 255)",
        "onBackground": "rgb(26, 28, 30)",
        "surface": "rgb(253, 251, 255)",
        "onSurface": "rgb(26, 28, 30)",
        "surfaceVariant": "rgb(224, 226, 236)",
        "onSurfaceVariant": "rgb(67, 71, 78)",
        "outline": "rgb(116, 119, 127)",
        "outlineVariant": "rgb(196, 198, 207)",
        "shadow": "rgb(0, 0, 0)",
        "scrim": "rgb(0, 0, 0)",
        "inverseSurface": "rgb(47, 48, 51)",
        "inverseOnSurface": "rgb(241, 240, 244)",
        "inversePrimary": "rgb(167, 200, 255)",
        "elevation": {
            "level0": "transparent",
            "level1": "rgb(240, 243, 251)",
            "level2": "rgb(233, 238, 249)",
            "level3": "rgb(225, 234, 247)",
            "level4": "rgb(223, 232, 246)",
            "level5": "rgb(218, 229, 244)"
        },
        "surfaceDisabled": "rgba(26, 28, 30, 0.12)",
        "onSurfaceDisabled": "rgba(26, 28, 30, 0.38)",
        "backdrop": "rgba(45, 48, 56, 0.4)"
    }
}


//  fonts: configureFonts({ config: fontConfig })
// Copy it from the color codes scheme and then use it here


export default theme

// const useMode = (mod) => {
//     const [mode, setMode] = useState("light")
//     mod=="dark"? :


// }

export const darkTheme = {
    ...DarkDefaultTheme,
    roundness: 4,
    "skeletonbackground": "rgb(204, 204, 204)",
    "skeletonhighlight": "rgb(140, 140, 140)",
    "colors": {
        "skeletonbackground": "rgb(204, 204, 204)",
        "skeletonhighlight": "rgb(140, 140, 140)",

        "primary": "rgb(167, 200, 255)",
        "onPrimary": "rgb(0, 48, 97)",
        "primaryContainer": "rgb(0, 71, 136)",
        "onPrimaryContainer": "rgb(213, 227, 255)",
        "secondary": "rgb(189, 199, 220)",
        "onSecondary": "rgb(39, 49, 65)",
        "secondaryContainer": "rgb(61, 71, 88)",
        "onSecondaryContainer": "rgb(217, 227, 248)",
        "tertiary": "rgb(219, 188, 225)",
        "onTertiary": "rgb(62, 40, 69)",
        "tertiaryContainer": "rgb(85, 62, 93)",
        "onTertiaryContainer": "rgb(248, 216, 254)",
        "error": "rgb(255, 180, 171)",
        "onError": "rgb(105, 0, 5)",
        "errorContainer": "rgb(147, 0, 10)",
        "onErrorContainer": "rgb(255, 180, 171)",
        "background": "rgb(26, 28, 30)",
        "onBackground": "rgb(227, 226, 230)",
        "surface": "rgb(26, 28, 30)",
        "onSurface": "rgb(227, 226, 230)",
        "surfaceVariant": "rgb(67, 71, 78)",
        "onSurfaceVariant": "rgb(196, 198, 207)",
        "outline": "rgb(142, 145, 153)",
        "outlineVariant": "rgb(67, 71, 78)",
        "shadow": "rgb(0, 0, 0)",
        "scrim": "rgb(0, 0, 0)",
        "inverseSurface": "rgb(227, 226, 230)",
        "inverseOnSurface": "rgb(47, 48, 51)",
        "inversePrimary": "rgb(0, 94, 178)",
        "elevation": {
            "level0": "transparent",
            "level1": "rgb(33, 37, 41)",
            "level2": "rgb(37, 42, 48)",
            "level3": "rgb(42, 47, 55)",
            "level4": "rgb(43, 49, 57)",
            "level5": "rgb(46, 52, 62)"
        },
        "surfaceDisabled": "rgba(227, 226, 230, 0.12)",
        "onSurfaceDisabled": "rgba(227, 226, 230, 0.38)",
        "backdrop": "rgba(45, 48, 56, 0.4)"
    }
}