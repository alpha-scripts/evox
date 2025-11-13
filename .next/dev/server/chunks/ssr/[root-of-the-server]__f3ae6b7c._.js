module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/Tictactoe/lib/utils.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cn",
    ()=>cn
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Tictactoe$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Tictactoe/node_modules/clsx/dist/clsx.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Tictactoe$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Tictactoe/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-ssr] (ecmascript)");
;
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Tictactoe$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Tictactoe$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
}),
"[project]/Tictactoe/src/components/Square.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Square",
    ()=>Square
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Tictactoe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Tictactoe/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Tictactoe$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Tictactoe/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Tictactoe$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Tictactoe/lib/utils.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Tictactoe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Tictactoe/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
;
;
const Square = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Tictactoe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"])(function Square({ value, onClick, disabled = false, isWinning = false, index, ariaLabel, tabIndex, onKeyDown }, ref) {
    const [hasValue, setHasValue] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Tictactoe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Tictactoe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (value) {
            setHasValue(true);
        } else {
            setHasValue(false);
        }
    }, [
        value
    ]);
    // Generate accessible label
    const getAriaLabel = ()=>{
        if (ariaLabel) return ariaLabel;
        const row = Math.floor(index / 3) + 1;
        const col = index % 3 + 1;
        const position = `Row ${row}, Column ${col}`;
        if (value === null) {
            return `${position}, empty square${isWinning ? ", winning" : ""}`;
        }
        return `${position}, ${value}${isWinning ? ", winning" : ""}`;
    };
    const handleKeyDown = (e)=>{
        if (onKeyDown) {
            onKeyDown(e);
        }
        // Allow Enter and Space to trigger click
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            if (!disabled && value === null) {
                onClick();
            }
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Tictactoe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Tictactoe$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].button, {
        ref: ref,
        onClick: onClick,
        onKeyDown: handleKeyDown,
        disabled: disabled || value !== null,
        role: "button",
        "aria-label": getAriaLabel(),
        "aria-disabled": disabled || value !== null,
        tabIndex: tabIndex,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Tictactoe$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("relative flex h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 lg:h-28 lg:w-28 items-center justify-center rounded-xl border-2", "bg-background/50 dark:bg-card/50 backdrop-blur-sm", "border-border/50 hover:border-primary/50", "text-card-foreground transition-all duration-200", "hover:bg-accent/50 hover:text-accent-foreground", "disabled:cursor-not-allowed disabled:opacity-50", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2", "shadow-md hover:shadow-lg", !value && !disabled && "hover:scale-105 cursor-pointer active:scale-95", isWinning && "border-primary shadow-primary/50 shadow-2xl"),
        initial: {
            scale: 0.8,
            opacity: 0
        },
        animate: {
            scale: 1,
            opacity: 1
        },
        transition: {
            duration: 0.3,
            delay: index * 0.03,
            ease: "easeOut"
        },
        whileHover: !disabled && !value ? {
            scale: 1.05,
            y: -2
        } : {},
        whileTap: !disabled && !value ? {
            scale: 0.95
        } : {},
        children: [
            isWinning && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Tictactoe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Tictactoe$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                className: "absolute inset-0 rounded-xl bg-primary/20",
                initial: {
                    opacity: 0,
                    scale: 0.8
                },
                animate: {
                    opacity: [
                        0.2,
                        0.5,
                        0.2
                    ],
                    scale: [
                        1,
                        1.1,
                        1
                    ]
                },
                transition: {
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                }
            }, void 0, false, {
                fileName: "[project]/Tictactoe/src/components/Square.tsx",
                lineNumber: 109,
                columnNumber: 9
            }, this),
            value && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Tictactoe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Tictactoe$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("relative z-10 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold select-none", value === "X" && "text-primary drop-shadow-lg", value === "O" && "text-destructive drop-shadow-lg"),
                children: value
            }, void 0, false, {
                fileName: "[project]/Tictactoe/src/components/Square.tsx",
                lineNumber: 126,
                columnNumber: 9
            }, this),
            isWinning && value && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Tictactoe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Tictactoe$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                className: "absolute inset-0 rounded-xl border-2 border-primary",
                initial: {
                    opacity: 0,
                    scale: 1
                },
                animate: {
                    opacity: [
                        0,
                        0.8,
                        0
                    ],
                    scale: [
                        1,
                        1.2,
                        1.4
                    ]
                },
                transition: {
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeOut"
                }
            }, void 0, false, {
                fileName: "[project]/Tictactoe/src/components/Square.tsx",
                lineNumber: 139,
                columnNumber: 9
            }, this),
            !value && !disabled && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Tictactoe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Tictactoe$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                className: "absolute inset-0 rounded-xl bg-primary/0 hover:bg-primary/10 transition-colors duration-200"
            }, void 0, false, {
                fileName: "[project]/Tictactoe/src/components/Square.tsx",
                lineNumber: 156,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Tictactoe/src/components/Square.tsx",
        lineNumber: 70,
        columnNumber: 5
    }, this);
});
}),
"[project]/Tictactoe/src/components/Board.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Board",
    ()=>Board
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Tictactoe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Tictactoe/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Tictactoe$2f$src$2f$components$2f$Square$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Tictactoe/src/components/Square.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Tictactoe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Tictactoe/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
;
function Board({ board, onSquareClick, winningCells = [], disabled = false }) {
    const [focusedIndex, setFocusedIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Tictactoe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const squareRefs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Tictactoe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])([]);
    // Reset focus when board resets
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Tictactoe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const isEmpty = board.every((cell)=>cell === null);
        if (isEmpty) {
            setFocusedIndex(null);
        }
    }, [
        board
    ]);
    const handleKeyDown = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Tictactoe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((index, e)=>{
        if (disabled) return;
        const row = Math.floor(index / 3);
        const col = index % 3;
        let newIndex = null;
        switch(e.key){
            case "ArrowUp":
                e.preventDefault();
                if (row > 0) {
                    newIndex = index - 3;
                }
                break;
            case "ArrowDown":
                e.preventDefault();
                if (row < 2) {
                    newIndex = index + 3;
                }
                break;
            case "ArrowLeft":
                e.preventDefault();
                if (col > 0) {
                    newIndex = index - 1;
                }
                break;
            case "ArrowRight":
                e.preventDefault();
                if (col < 2) {
                    newIndex = index + 1;
                }
                break;
            case "Home":
                e.preventDefault();
                newIndex = row * 3; // First column of current row
                break;
            case "End":
                e.preventDefault();
                newIndex = row * 3 + 2; // Last column of current row
                break;
            default:
                return;
        }
        if (newIndex !== null && newIndex >= 0 && newIndex < 9) {
            setFocusedIndex(newIndex);
            squareRefs.current[newIndex]?.focus();
        }
    }, [
        disabled
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Tictactoe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        role: "grid",
        "aria-label": "Tic Tac Toe board",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Tictactoe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-fit mx-auto grid grid-cols-3 gap-2 sm:gap-3 md:gap-4 p-3 sm:p-4 md:p-6",
            role: "rowgroup",
            children: board.map((value, index)=>{
                const row = Math.floor(index / 3);
                const isFirstInRow = index % 3 === 0;
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Tictactoe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    role: "gridcell",
                    "aria-rowindex": row + 1,
                    "aria-colindex": index % 3 + 1,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Tictactoe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Tictactoe$2f$src$2f$components$2f$Square$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Square"], {
                        ref: (el)=>{
                            squareRefs.current[index] = el;
                        },
                        value: value,
                        onClick: ()=>onSquareClick(index),
                        disabled: disabled,
                        isWinning: winningCells.includes(index),
                        index: index,
                        tabIndex: focusedIndex === index || focusedIndex === null && index === 0 && !value && !disabled ? 0 : -1,
                        onKeyDown: (e)=>handleKeyDown(index, e)
                    }, void 0, false, {
                        fileName: "[project]/Tictactoe/src/components/Board.tsx",
                        lineNumber: 101,
                        columnNumber: 15
                    }, this)
                }, index, false, {
                    fileName: "[project]/Tictactoe/src/components/Board.tsx",
                    lineNumber: 95,
                    columnNumber: 13
                }, this);
            })
        }, void 0, false, {
            fileName: "[project]/Tictactoe/src/components/Board.tsx",
            lineNumber: 86,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Tictactoe/src/components/Board.tsx",
        lineNumber: 85,
        columnNumber: 5
    }, this);
}
}),
"[project]/Tictactoe/src/components/Header.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Header",
    ()=>Header
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Tictactoe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Tictactoe/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Tictactoe$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Tictactoe/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Tictactoe$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$gamepad$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Gamepad2$3e$__ = __turbopack_context__.i("[project]/Tictactoe/node_modules/lucide-react/dist/esm/icons/gamepad-2.js [app-ssr] (ecmascript) <export default as Gamepad2>");
"use client";
;
;
;
function Header({ gameMode = "2P", currentPlayer = null, winner = null, difficulty }) {
    const getStatusText = ()=>{
        if (winner === "draw") {
            return "It's a draw!";
        }
        if (winner) {
            return `Player ${winner} wins!`;
        }
        if (gameMode === "1P" && currentPlayer === "O") {
            return `AI thinking... (${difficulty || "medium"})`;
        }
        if (currentPlayer) {
            return `Player ${currentPlayer}'s turn`;
        }
        return "Click a square to start";
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Tictactoe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Tictactoe$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].header, {
        className: "text-center space-y-4 mb-8",
        initial: {
            opacity: 0,
            y: -20
        },
        animate: {
            opacity: 1,
            y: 0
        },
        transition: {
            duration: 0.5
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Tictactoe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Tictactoe$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                className: "flex items-center justify-center gap-3",
                initial: {
                    scale: 0
                },
                animate: {
                    scale: 1
                },
                transition: {
                    type: "spring",
                    stiffness: 200,
                    damping: 15,
                    delay: 0.2
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Tictactoe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Tictactoe$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$gamepad$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Gamepad2$3e$__["Gamepad2"], {
                        className: "h-8 w-8 md:h-10 md:w-10 text-primary",
                        "aria-hidden": "true"
                    }, void 0, false, {
                        fileName: "[project]/Tictactoe/src/components/Header.tsx",
                        lineNumber: 53,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Tictactoe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary to-destructive bg-clip-text text-transparent",
                        children: "Tic Tac Toe"
                    }, void 0, false, {
                        fileName: "[project]/Tictactoe/src/components/Header.tsx",
                        lineNumber: 54,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Tictactoe/src/components/Header.tsx",
                lineNumber: 42,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Tictactoe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Tictactoe$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].p, {
                className: "text-lg md:text-xl text-muted-foreground font-medium",
                initial: {
                    opacity: 0,
                    scale: 0.9
                },
                animate: {
                    opacity: 1,
                    scale: 1
                },
                transition: {
                    duration: 0.3
                },
                role: "status",
                "aria-live": "polite",
                "aria-atomic": "true",
                children: getStatusText()
            }, `${winner}-${currentPlayer}-${gameMode}`, false, {
                fileName: "[project]/Tictactoe/src/components/Header.tsx",
                lineNumber: 59,
                columnNumber: 7
            }, this),
            gameMode && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Tictactoe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Tictactoe$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                className: "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-medium",
                initial: {
                    opacity: 0
                },
                animate: {
                    opacity: 1
                },
                transition: {
                    delay: 0.4
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Tictactoe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: "Mode:"
                    }, void 0, false, {
                        fileName: "[project]/Tictactoe/src/components/Header.tsx",
                        lineNumber: 79,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Tictactoe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "font-bold",
                        "aria-label": `Game mode: ${gameMode === "1P" ? "1 player" : "2 players"}`,
                        children: gameMode
                    }, void 0, false, {
                        fileName: "[project]/Tictactoe/src/components/Header.tsx",
                        lineNumber: 80,
                        columnNumber: 11
                    }, this),
                    gameMode === "1P" && difficulty && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Tictactoe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-xs opacity-75",
                        "aria-label": `Difficulty: ${difficulty}`,
                        children: [
                            "(",
                            difficulty,
                            ")"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Tictactoe/src/components/Header.tsx",
                        lineNumber: 84,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Tictactoe/src/components/Header.tsx",
                lineNumber: 73,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Tictactoe/src/components/Header.tsx",
        lineNumber: 36,
        columnNumber: 5
    }, this);
}
}),
"[project]/Tictactoe/components/ui/button.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Button",
    ()=>Button,
    "buttonVariants",
    ()=>buttonVariants
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Tictactoe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Tictactoe/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Tictactoe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Tictactoe/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Tictactoe$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Tictactoe/node_modules/@radix-ui/react-slot/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Tictactoe$2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Tictactoe/node_modules/class-variance-authority/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Tictactoe$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Tictactoe/lib/utils.ts [app-ssr] (ecmascript)");
;
;
;
;
;
const buttonVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Tictactoe$2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cva"])("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
    variants: {
        variant: {
            default: "bg-primary text-primary-foreground hover:bg-primary/90",
            destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
            outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
            secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
            ghost: "hover:bg-accent hover:text-accent-foreground",
            link: "text-primary underline-offset-4 hover:underline"
        },
        size: {
            default: "h-10 px-4 py-2",
            sm: "h-9 rounded-md px-3",
            lg: "h-11 rounded-md px-8",
            icon: "h-10 w-10"
        }
    },
    defaultVariants: {
        variant: "default",
        size: "default"
    }
});
const Button = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Tictactoe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](({ className, variant, size, asChild = false, ...props }, ref)=>{
    const Comp = asChild ? __TURBOPACK__imported__module__$5b$project$5d2f$Tictactoe$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Slot"] : "button";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Tictactoe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Comp, {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Tictactoe$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])(buttonVariants({
            variant,
            size,
            className
        })),
        ref: ref,
        ...props
    }, void 0, false, {
        fileName: "[project]/Tictactoe/components/ui/button.tsx",
        lineNumber: 46,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
});
Button.displayName = "Button";
;
}),
"[project]/Tictactoe/src/components/Controls.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Controls",
    ()=>Controls
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Tictactoe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Tictactoe/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Tictactoe$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Tictactoe/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Tictactoe$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Tictactoe/components/ui/button.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Tictactoe$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__ = __turbopack_context__.i("[project]/Tictactoe/node_modules/lucide-react/dist/esm/icons/rotate-ccw.js [app-ssr] (ecmascript) <export default as RotateCcw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Tictactoe$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/Tictactoe/node_modules/lucide-react/dist/esm/icons/users.js [app-ssr] (ecmascript) <export default as Users>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Tictactoe$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$cpu$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Cpu$3e$__ = __turbopack_context__.i("[project]/Tictactoe/node_modules/lucide-react/dist/esm/icons/cpu.js [app-ssr] (ecmascript) <export default as Cpu>");
"use client";
;
;
;
;
function Controls({ onNewGame, onModeToggle, onDifficultyChange, gameMode, difficulty, disabled = false }) {
    const difficulties = [
        "easy",
        "medium",
        "hard"
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Tictactoe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Tictactoe$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
        className: "flex flex-col sm:flex-row items-center justify-center gap-4 mt-8",
        initial: {
            opacity: 0,
            y: 20
        },
        animate: {
            opacity: 1,
            y: 0
        },
        transition: {
            duration: 0.5,
            delay: 0.3
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Tictactoe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Tictactoe$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                onClick: onNewGame,
                disabled: false,
                size: "lg",
                className: "min-w-[140px]",
                "aria-label": "Start a new game",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Tictactoe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Tictactoe$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__["RotateCcw"], {
                        className: "mr-2 h-4 w-4",
                        "aria-hidden": "true"
                    }, void 0, false, {
                        fileName: "[project]/Tictactoe/src/components/Controls.tsx",
                        lineNumber: 41,
                        columnNumber: 9
                    }, this),
                    "New Game"
                ]
            }, void 0, true, {
                fileName: "[project]/Tictactoe/src/components/Controls.tsx",
                lineNumber: 34,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Tictactoe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Tictactoe$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                onClick: onModeToggle,
                variant: "outline",
                size: "lg",
                className: "min-w-[140px]",
                disabled: disabled,
                "aria-label": `Switch to ${gameMode === "1P" ? "2 player" : "1 player"} mode`,
                "aria-pressed": gameMode === "1P",
                children: gameMode === "1P" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Tictactoe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Tictactoe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Tictactoe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Tictactoe$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$cpu$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Cpu$3e$__["Cpu"], {
                            className: "mr-2 h-4 w-4",
                            "aria-hidden": "true"
                        }, void 0, false, {
                            fileName: "[project]/Tictactoe/src/components/Controls.tsx",
                            lineNumber: 56,
                            columnNumber: 13
                        }, this),
                        "AI Mode"
                    ]
                }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Tictactoe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Tictactoe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Tictactoe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Tictactoe$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"], {
                            className: "mr-2 h-4 w-4",
                            "aria-hidden": "true"
                        }, void 0, false, {
                            fileName: "[project]/Tictactoe/src/components/Controls.tsx",
                            lineNumber: 61,
                            columnNumber: 13
                        }, this),
                        "2 Players"
                    ]
                }, void 0, true)
            }, void 0, false, {
                fileName: "[project]/Tictactoe/src/components/Controls.tsx",
                lineNumber: 45,
                columnNumber: 7
            }, this),
            gameMode === "1P" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Tictactoe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Tictactoe$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                className: "flex gap-2",
                initial: {
                    opacity: 0,
                    scale: 0.9
                },
                animate: {
                    opacity: 1,
                    scale: 1
                },
                transition: {
                    duration: 0.3
                },
                children: difficulties.map((diff)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Tictactoe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Tictactoe$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                        onClick: ()=>onDifficultyChange(diff),
                        variant: difficulty === diff ? "default" : "outline",
                        size: "sm",
                        disabled: disabled,
                        className: "capitalize min-w-[80px]",
                        "aria-label": `Set difficulty to ${diff}`,
                        "aria-pressed": difficulty === diff,
                        children: diff
                    }, diff, false, {
                        fileName: "[project]/Tictactoe/src/components/Controls.tsx",
                        lineNumber: 75,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/Tictactoe/src/components/Controls.tsx",
                lineNumber: 68,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Tictactoe/src/components/Controls.tsx",
        lineNumber: 28,
        columnNumber: 5
    }, this);
}
}),
"[project]/Tictactoe/src/components/index.ts [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Tictactoe$2f$src$2f$components$2f$Square$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Tictactoe/src/components/Square.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Tictactoe$2f$src$2f$components$2f$Board$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Tictactoe/src/components/Board.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Tictactoe$2f$src$2f$components$2f$Header$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Tictactoe/src/components/Header.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Tictactoe$2f$src$2f$components$2f$Controls$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Tictactoe/src/components/Controls.tsx [app-ssr] (ecmascript)");
;
;
;
;
}),
"[project]/Tictactoe/src/lib/game.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "checkWinner",
    ()=>checkWinner,
    "createEmptyBoard",
    ()=>createEmptyBoard,
    "getAvailableMoves",
    ()=>getAvailableMoves,
    "getBestMove",
    ()=>getBestMove,
    "getWinningCells",
    ()=>getWinningCells,
    "isBoardFull",
    ()=>isBoardFull,
    "makeMove",
    ()=>makeMove
]);
function createEmptyBoard() {
    return Array(9).fill(null);
}
function makeMove(board, index, player) {
    // Validate inputs
    if (index < 0 || index > 8) {
        return null; // Invalid index
    }
    if (board[index] !== null) {
        return null; // Cell already occupied
    }
    if (player !== "X" && player !== "O") {
        return null; // Invalid player
    }
    // Create a new board with the move
    const newBoard = [
        ...board
    ];
    newBoard[index] = player;
    return newBoard;
}
function checkWinner(board) {
    // Winning combinations (indices)
    const winningCombinations = [
        [
            0,
            1,
            2
        ],
        [
            3,
            4,
            5
        ],
        [
            6,
            7,
            8
        ],
        [
            0,
            3,
            6
        ],
        [
            1,
            4,
            7
        ],
        [
            2,
            5,
            8
        ],
        [
            0,
            4,
            8
        ],
        [
            2,
            4,
            6
        ]
    ];
    // Check each winning combination
    for (const combination of winningCombinations){
        const [a, b, c] = combination;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a]; // Return the winner
        }
    }
    // Check for draw (board is full and no winner)
    if (isBoardFull(board)) {
        return "draw";
    }
    // No winner yet, game continues
    return null;
}
function getWinningCells(board) {
    const winningCombinations = [
        [
            0,
            1,
            2
        ],
        [
            3,
            4,
            5
        ],
        [
            6,
            7,
            8
        ],
        [
            0,
            3,
            6
        ],
        [
            1,
            4,
            7
        ],
        [
            2,
            5,
            8
        ],
        [
            0,
            4,
            8
        ],
        [
            2,
            4,
            6
        ]
    ];
    // Check each winning combination
    for (const combination of winningCombinations){
        const [a, b, c] = combination;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return combination; // Return the winning combination
        }
    }
    // No winner
    return [];
}
function isBoardFull(board) {
    return board.every((cell)=>cell !== null);
}
function getAvailableMoves(board) {
    return board.map((cell, index)=>cell === null ? index : -1).filter((index)=>index !== -1);
}
/**
 * Gets the opponent player
 * @param player - Current player
 * @returns The opponent player
 */ function getOpponent(player) {
    return player === "X" ? "O" : "X";
}
/**
 * Evaluates the board state from a player's perspective
 * @param board - Current board state
 * @param player - Player to evaluate for
 * @returns Score: 10 for win, -10 for loss, 0 for draw/ongoing
 */ function evaluateBoard(board, player) {
    const winner = checkWinner(board);
    if (winner === player) {
        return 10; // Player wins
    } else if (winner === getOpponent(player)) {
        return -10; // Opponent wins
    } else if (winner === "draw") {
        return 0; // Draw
    }
    return 0; // Game ongoing
}
/**
 * Heuristic to evaluate move quality based on position
 * Center > Corners > Edges
 * @param move - Move index
 * @returns Heuristic score (higher is better)
 */ function getMoveHeuristic(move) {
    const center = 4;
    const corners = [
        0,
        2,
        6,
        8
    ];
    const edges = [
        1,
        3,
        5,
        7
    ];
    if (move === center) return 3;
    if (corners.includes(move)) return 2;
    if (edges.includes(move)) return 1;
    return 0;
}
/**
 * Minimax algorithm to find the best move
 * @param board - Current board state
 * @param player - Current player
 * @param depth - Maximum depth to search
 * @param isMaximizing - Whether we're maximizing or minimizing
 * @param currentDepth - Current depth in the search tree
 * @returns Score and best move index
 */ function minimax(board, player, depth, isMaximizing, currentDepth = 0) {
    const winner = checkWinner(board);
    // Terminal states
    if (winner === player) {
        return {
            score: 10 - currentDepth,
            move: null
        }; // Prefer faster wins
    } else if (winner === getOpponent(player)) {
        return {
            score: currentDepth - 10,
            move: null
        }; // Prefer slower losses
    } else if (winner === "draw" || isBoardFull(board)) {
        return {
            score: 0,
            move: null
        };
    }
    // Depth limit reached
    if (currentDepth >= depth) {
        return {
            score: 0,
            move: null
        };
    }
    const availableMoves = getAvailableMoves(board);
    // Sort moves by heuristic (center > corners > edges) for better move selection
    const sortedMoves = [
        ...availableMoves
    ].sort((a, b)=>{
        return getMoveHeuristic(b) - getMoveHeuristic(a);
    });
    if (isMaximizing) {
        let bestScore = -Infinity;
        let bestMove = sortedMoves[0] || null;
        let bestHeuristic = -1;
        for (const move of sortedMoves){
            const newBoard = makeMove(board, move, player);
            if (!newBoard) continue;
            const result = minimax(newBoard, player, depth, false, currentDepth + 1);
            const moveHeuristic = getMoveHeuristic(move);
            // Prefer moves with better score, or equal score with better heuristic
            if (result.score > bestScore || result.score === bestScore && moveHeuristic > bestHeuristic) {
                bestScore = result.score;
                bestMove = move;
                bestHeuristic = moveHeuristic;
            }
        }
        return {
            score: bestScore,
            move: bestMove
        };
    } else {
        // Minimizing: opponent's turn
        let bestScore = Infinity;
        for (const move of sortedMoves){
            const newBoard = makeMove(board, move, getOpponent(player));
            if (!newBoard) continue;
            const result = minimax(newBoard, player, depth, true, currentDepth + 1);
            if (result.score < bestScore) {
                bestScore = result.score;
            }
        }
        return {
            score: bestScore,
            move: null
        }; // No move in minimizing branch
    }
}
function getBestMove(board, player, difficulty = "medium") {
    const availableMoves = getAvailableMoves(board);
    if (availableMoves.length === 0) {
        return null; // No moves available
    }
    // Easy: random move
    if (difficulty === "easy") {
        const randomIndex = Math.floor(Math.random() * availableMoves.length);
        return availableMoves[randomIndex];
    }
    // Medium: shallow minimax (depth 2)
    if (difficulty === "medium") {
        const result = minimax(board, player, 2, true);
        return result.move;
    }
    // Hard: full minimax (depth 9 for complete game tree)
    if (difficulty === "hard") {
        const result = minimax(board, player, 9, true);
        return result.move;
    }
    // Fallback to medium
    const result = minimax(board, player, 2, true);
    return result.move;
}
}),
"[project]/Tictactoe/app/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Tictactoe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Tictactoe/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Tictactoe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Tictactoe/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Tictactoe$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Tictactoe/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Tictactoe$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Tictactoe/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Tictactoe$2f$src$2f$components$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Tictactoe/src/components/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Tictactoe$2f$src$2f$components$2f$Board$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Tictactoe/src/components/Board.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Tictactoe$2f$src$2f$components$2f$Header$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Tictactoe/src/components/Header.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Tictactoe$2f$src$2f$components$2f$Controls$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Tictactoe/src/components/Controls.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Tictactoe$2f$src$2f$lib$2f$game$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Tictactoe/src/lib/game.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
function Home() {
    const [board, setBoard] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Tictactoe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Tictactoe$2f$src$2f$lib$2f$game$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createEmptyBoard"])());
    const [currentPlayer, setCurrentPlayer] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Tictactoe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("X");
    const [winner, setWinner] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Tictactoe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [gameMode, setGameMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Tictactoe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("2P");
    const [difficulty, setDifficulty] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Tictactoe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("medium");
    const [winningCells, setWinningCells] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Tictactoe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isAITurning, setIsAITurning] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Tictactoe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const aiMoveTimeoutRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Tictactoe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const isAIMovingRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Tictactoe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(false);
    const boardRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Tictactoe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(board);
    // Keep board ref in sync with board state
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Tictactoe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        boardRef.current = board;
    }, [
        board
    ]);
    // Check for winner after each move
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Tictactoe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const gameWinner = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Tictactoe$2f$src$2f$lib$2f$game$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["checkWinner"])(board);
        setWinner(gameWinner);
        if (gameWinner && gameWinner !== "draw") {
            const cells = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Tictactoe$2f$src$2f$lib$2f$game$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getWinningCells"])(board);
            setWinningCells(cells);
        } else {
            setWinningCells([]);
        }
    }, [
        board
    ]);
    // Handle AI move in 1P mode
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Tictactoe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        // Clean up any pending AI move
        const cleanup = ()=>{
            if (aiMoveTimeoutRef.current) {
                clearTimeout(aiMoveTimeoutRef.current);
                aiMoveTimeoutRef.current = null;
            }
            isAIMovingRef.current = false;
        };
        // Only trigger AI move if conditions are met
        if (gameMode === "1P" && !winner && currentPlayer === "O" && !isAIMovingRef.current) {
            cleanup(); // Clean up any existing timeout
            isAIMovingRef.current = true;
            setIsAITurning(true);
            // Add a small delay for better UX
            aiMoveTimeoutRef.current = setTimeout(()=>{
                // Get latest board state from ref
                const currentBoardState = boardRef.current;
                // Check if game is still ongoing
                const gameWinner = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Tictactoe$2f$src$2f$lib$2f$game$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["checkWinner"])(currentBoardState);
                if (gameWinner) {
                    isAIMovingRef.current = false;
                    setIsAITurning(false);
                    aiMoveTimeoutRef.current = null;
                    return;
                }
                // Make AI move
                const aiMove = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Tictactoe$2f$src$2f$lib$2f$game$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getBestMove"])(currentBoardState, "O", difficulty);
                if (aiMove !== null) {
                    const newBoard = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Tictactoe$2f$src$2f$lib$2f$game$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["makeMove"])(currentBoardState, aiMove, "O");
                    if (newBoard) {
                        // Update board and switch to player X
                        setBoard(newBoard);
                        setCurrentPlayer("X");
                        isAIMovingRef.current = false;
                        setIsAITurning(false);
                        aiMoveTimeoutRef.current = null;
                        return;
                    }
                }
                // No valid move or game ended
                isAIMovingRef.current = false;
                setIsAITurning(false);
                aiMoveTimeoutRef.current = null;
            }, 300); // 300ms delay to show AI is "thinking"
            return cleanup;
        }
        return cleanup;
    }, [
        board,
        currentPlayer,
        gameMode,
        difficulty,
        winner
    ]);
    // Handle square click
    const handleSquareClick = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Tictactoe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((index)=>{
        // Don't allow moves if game is over or it's AI's turn
        if (winner || isAITurning || !currentPlayer) {
            return;
        }
        // In 1P mode, only allow X (player) to move
        if (gameMode === "1P" && currentPlayer === "O") {
            return;
        }
        // Try to make the move
        const newBoard = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Tictactoe$2f$src$2f$lib$2f$game$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["makeMove"])(board, index, currentPlayer);
        if (!newBoard) {
            return; // Invalid move
        }
        setBoard(newBoard);
        // Switch player
        setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    }, [
        board,
        currentPlayer,
        winner,
        gameMode,
        isAITurning
    ]);
    // Handle new game
    const handleNewGame = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Tictactoe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        // Clean up any pending AI moves
        if (aiMoveTimeoutRef.current) {
            clearTimeout(aiMoveTimeoutRef.current);
            aiMoveTimeoutRef.current = null;
        }
        isAIMovingRef.current = false;
        setBoard((0, __TURBOPACK__imported__module__$5b$project$5d2f$Tictactoe$2f$src$2f$lib$2f$game$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createEmptyBoard"])());
        setCurrentPlayer("X");
        setWinner(null);
        setWinningCells([]);
        setIsAITurning(false);
    }, []);
    // Handle mode toggle
    const handleModeToggle = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Tictactoe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        const newMode = gameMode === "1P" ? "2P" : "1P";
        setGameMode(newMode);
        // Reset game when changing mode
        handleNewGame();
    }, [
        gameMode,
        handleNewGame
    ]);
    // Handle difficulty change
    const handleDifficultyChange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Tictactoe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((newDifficulty)=>{
        setDifficulty(newDifficulty);
        // Reset game when changing difficulty
        handleNewGame();
    }, [
        handleNewGame
    ]);
    // Check if game is disabled
    const isGameDisabled = winner !== null || isAITurning;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Tictactoe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "relative flex min-h-screen flex-col items-center justify-center p-4 md:p-6 lg:p-8 overflow-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Tictactoe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-destructive/5 dark:from-primary/10 dark:via-background dark:to-destructive/10"
            }, void 0, false, {
                fileName: "[project]/Tictactoe/app/page.tsx",
                lineNumber: 178,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Tictactoe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]"
            }, void 0, false, {
                fileName: "[project]/Tictactoe/app/page.tsx",
                lineNumber: 179,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Tictactoe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Tictactoe$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                mode: "wait",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Tictactoe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Tictactoe$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                    className: "relative w-full max-w-2xl mx-auto space-y-6 md:space-y-8 z-10",
                    initial: {
                        opacity: 0,
                        y: 20,
                        scale: 0.95
                    },
                    animate: {
                        opacity: 1,
                        y: 0,
                        scale: 1
                    },
                    exit: {
                        opacity: 0,
                        y: -20,
                        scale: 0.95
                    },
                    transition: {
                        duration: 0.5,
                        ease: "easeOut"
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Tictactoe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Tictactoe$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                        className: "backdrop-blur-xl bg-card/80 dark:bg-card/60 border border-border/50 rounded-2xl md:rounded-3xl shadow-2xl p-4 md:p-6 lg:p-8",
                        initial: {
                            opacity: 0
                        },
                        animate: {
                            opacity: 1
                        },
                        transition: {
                            duration: 0.3,
                            delay: 0.1
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Tictactoe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Tictactoe$2f$src$2f$components$2f$Header$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Header"], {
                                gameMode: gameMode,
                                currentPlayer: currentPlayer,
                                winner: winner,
                                difficulty: difficulty
                            }, void 0, false, {
                                fileName: "[project]/Tictactoe/app/page.tsx",
                                lineNumber: 198,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Tictactoe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Tictactoe$2f$src$2f$components$2f$Board$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Board"], {
                                board: board,
                                onSquareClick: handleSquareClick,
                                winningCells: winningCells,
                                disabled: isGameDisabled
                            }, void 0, false, {
                                fileName: "[project]/Tictactoe/app/page.tsx",
                                lineNumber: 205,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Tictactoe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Tictactoe$2f$src$2f$components$2f$Controls$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Controls"], {
                                onNewGame: handleNewGame,
                                onModeToggle: handleModeToggle,
                                onDifficultyChange: handleDifficultyChange,
                                gameMode: gameMode,
                                difficulty: difficulty,
                                disabled: isAITurning && !winner
                            }, void 0, false, {
                                fileName: "[project]/Tictactoe/app/page.tsx",
                                lineNumber: 212,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Tictactoe/app/page.tsx",
                        lineNumber: 192,
                        columnNumber: 11
                    }, this)
                }, `${gameMode}-${difficulty}`, false, {
                    fileName: "[project]/Tictactoe/app/page.tsx",
                    lineNumber: 183,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Tictactoe/app/page.tsx",
                lineNumber: 182,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Tictactoe/app/page.tsx",
        lineNumber: 176,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__f3ae6b7c._.js.map