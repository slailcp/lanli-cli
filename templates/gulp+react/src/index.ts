export * from "./calendar"
export * from "./icons"
export * from "./Modal"
export * from "./Navbar"
export * from "./Toast"

import * as Calendar from "./calendar"
import * as icons from "./icons"
import * as Modal from "./Modal"
import * as Navbar from "./Navbar"
import * as Toast from "./Toast"



export default {
    ...Calendar,
    ...icons,
    ...Modal,
    ...Navbar,
    ...Toast
} 