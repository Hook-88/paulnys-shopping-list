import { FaEllipsis, FaEyeSlash, FaMinus, FaPlus } from "react-icons/fa6"
import PageHeader from "../../components/PageHeader/PageHeader"
import PageBody from "../../components/PageBody"
import { shoppingList } from "../../data.ts"
import Button from "../../components/Button"
import List from "../../components/List/List.tsx"
import Card from "../../components/Card.tsx"
import Menu from "../../components/Menu/Menu.tsx"

export default function PageShoppingList(){
    
    return (
        <>
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
                {/* <button className="flex items-center justify-center">
                    <FaEllipsis />
                </button> */}
            </PageHeader>
            <PageBody>
                <List>
                    <List.Header>
                        <List.Progress />
                        <button className="flex items-center gap-1 text-xs">
                            Hide selected <FaEyeSlash />
                        </button>
                    </List.Header>
                    <List.Body>
                        {
                            shoppingList.map(item => (
                                <li 
                                    key={item.id}
                                    className="border border-transparent"
                                >
                                    <Card className="flex">
                                        { item.name }
                                        { item.quantity > 1 && ` (${item.quantity}x)` }
                                        <div className="flex ml-auto gap-2">
                                            {
                                                item.quantity > 1 && (
                                                    <Button className="p-1 bg-orange-900">
                                                        <FaMinus />
                                                    </Button>
                                                )
                                            }
                                            <Button className="p-1 bg-sky-900">
                                                <FaPlus />
                                            </Button>
                                        </div>

                                    </Card>
                                </li>
                            ))
                        }
                    </List.Body>
                </List>
                
            </PageBody>
        </>
    )
}