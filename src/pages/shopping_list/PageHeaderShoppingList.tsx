import PageHeader from "../../components/PageHeader/PageHeader"
import Menu from "../../components/Menu/Menu"
import { FaEllipsis } from "react-icons/fa6"

export default function PageHeaderShoppingList() {
    
    return (
        <PageHeader>
            <PageHeader.Title>
                Shopping List
            </PageHeader.Title>
            <Menu>
                <Menu.Button>
                    <FaEllipsis />
                </Menu.Button>
                <Menu.Dropdown>
                    <Menu.Item itemType="button">
                        Add new item
                    </Menu.Item>
                    <Menu.Item itemType="button">
                        Delete selection
                    </Menu.Item>
                </Menu.Dropdown>
            </Menu>
        </PageHeader>
    )
}