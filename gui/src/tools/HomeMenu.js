import { CollapsableMenu, Menu, MenuItem } from "../components/Menu"
function HomeMenu() {
    return <Menu>
        <MenuItem title={"1"} onMenuClick={e=>console.log(e) } />
        <MenuItem title={"2"} onMenuClick={e=>console.log(e) }/>
        <MenuItem title={"3"} onMenuClick={e=>console.log(e) }/>
        <CollapsableMenu title={"colapsable"}>
            <MenuItem title={"1"} onMenuClick={e=>console.log(e) }/>
            <MenuItem title={"2"} onMenuClick={e=>console.log(e) }/>
            <CollapsableMenu title={"colapsable"}>
                <MenuItem title={"1"} onMenuClick={e=>console.log(e) }/>
                <MenuItem title={"2"} onMenuClick={e=>console.log(e) }/>
            </CollapsableMenu>
        </CollapsableMenu>
    </Menu>
}

export default HomeMenu