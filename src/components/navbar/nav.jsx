import { Avatar, Box, Button,   Drawer,
	DrawerBody,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton, Flex, Input, Link, Menu, MenuButton, MenuItem, MenuList, Text, Tooltip, useDisclosure, Divider, Center, FocusLock, WrapItem, Image } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import {
	CreatePostLogo,
	ExploreLogo,
	InstagramLogo,
	InstagramMobileLogo,
	Loggin,
	MoreLogo,
	NotificationsLogo,
	SearchLogo,
} from "../../assets/constants";


import { AiFillHome } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searching } from "../../redux/user/userAction";
import { SIGN_OUT } from "../../redux/user/userType";

const Sidebar = () => {
	const [state, setState] = useState(false);
	const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()
	const sidebarItems = [
		{
			icon: <AiFillHome size={25} />,
			text: "Home",
			link: "/",
		},
		{
			icon: <SearchLogo />,
			text: "Search",
		},

		{
			icon: <NotificationsLogo />,
			text: "Notifications",
		},
		{
			icon: <CreatePostLogo />,
			text: "Create",
		},
		{
			icon: <ExploreLogo />,
			text: "Explore"
		}
	];
	
 let time_id;
 var dispatch=useDispatch();
 var data=useSelector((state)=>state.UserReducer);
 console.log(data)
 console.log('data',data.search_results)
	const OnSearch=(value)=>{
        if(time_id){
			clearTimeout(time_id)
		}
		time_id=setTimeout(()=>{
            dispatch(searching(value))
        },500)
	}

	return (

		<Box
			height={"100vh"}
			borderRight={"1px solid"}
			borderColor={"whiteAlpha.300"}
			py={8}
			position={"Sticky"}
			top={0}
			left={0}
			px={{ base: 2, md: 4 }}
		>
		

			<Drawer
			size={{base:'full',sm:'sm'}}
			isFullHeight
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
        finalFocusRef={btnRef}

      >
	 
		<DrawerOverlay />
        <DrawerContent >
          
          <DrawerBody >
		  <Flex flexDirection={'row'}>
			<Flex border="1px solid #d3d3d3" w={"60px"} h={"full"} p={"0"} m={"0"} borderColor={"white #d3d3d3 white white"}>
		<Flex >
		<Flex direction={"column"} gap={10}   justifyContent='space-between'  height={"95vh"} >
		<Flex flexDirection={'column'}>
				<Link
					to={"/"}
					as={RouterLink}
					p={2}
					mt={'15px'}
					borderRadius={6}
					mb={'30px'}
					_hover={{
						bg: "whiteAlpha.200",
					}}
					w={10}
					cursor='pointer'
				>
					<InstagramMobileLogo />

				</Link>

				<Flex direction={"column"} gap={5} cursor={"pointer"}>
					{sidebarItems.map((item, index) => (
						<Tooltip
							key={index}
							hasArrow
							label={item.text}
							placement='right'
							
							openDelay={500}
							display={{ base: "block", md: "none" }}
						>
							<Link
								display={"flex"}
								to={item.link || ""}
								as={RouterLink}
								alignItems={"center"}
								gap={4}
								_hover={{ bg: "rgb(239,239,239)" }}
								borderRadius={6}
								p={2}
								w={{ base: 10, md: "full" }}
								
								justifyContent={{ base: "center", md: "flex-start" }}

							>
								{item.icon}
								
							</Link>
						</Tooltip>
					))}
				</Flex>
				</Flex>
				<Flex flexDirection={'column'} gap={'15px'}>
				<Tooltip
					hasArrow
					label={"Logout"}
					placement='right'
					ml={1}
					openDelay={500}
					display={{ base: "block", md: "none" }}
				>
					<Link
						display={"flex"}
						to={"/auth"}
						as={RouterLink}
						alignItems={"center"}
						gap={4}
						_hover={{ bg: "rgb(239,239,239)" }}
						borderRadius={6}
						p={2}
						onClick={()=> dispatch({type:SIGN_OUT})}
						w={{ base: 10, md: "full" }}
						mt={"240px"}
						ml={"5px"}
						justifyContent={{ base: "center", md: "flex-start" }}
					>
						{data.isAuth ? <BiLogOut size={25} />
							 : <Loggin />}

					</Link>

				</Tooltip>
				<Tooltip
					hasArrow
					label={"More"}
					placement='right'
					
					openDelay={500}
					display={{ base: "block", md: "none" }}
				>


					<Link
						display={"flex"}
						alignItems={"center"}
						gap={4}
						_hover={{ bg: "rgb(239,239,239)" }}
						borderRadius={6}
						
						w={{ base: 10, md: "full" }}
						mt={"auto"}

						justifyContent={{ base: "center", md: "flex-start" }}
					>
						<Menu>
							<MenuButton as={Button}
								transition='all 0.2s'
								bg={"white"}
								_hover={{ bg: 'rgb(239,239,239)' }}
								_expanded={{ bg: 'white' }}
							>
								<MoreLogo />
								
							</MenuButton>
							<MenuList
							
							>
								<MenuItem>Download</MenuItem>
								<MenuItem>Create a Copy</MenuItem>
								<MenuItem>Mark as Draft</MenuItem>
								<MenuItem>Delete</MenuItem>
								<MenuItem>Attend a Workshop</MenuItem>
							</MenuList>
						</Menu>

					</Link>

				</Tooltip>
				</Flex>
			</Flex>
		</Flex>

		<Flex>

		</Flex>
		</Flex>
		

		<Flex flexDirection={'column'} w={'100%'} >
		<Text ml={'20px'} mt='15px' fontSize={'25px'}>Search</Text>
		<FocusLock returnFocus persistentFocus={true}>
		<Input onChange={(e)=>OnSearch(e.target.value)} focusBorderColor='#d3d3d3'  width={{base:'100%',sm:'340px'}} _focus={true} mt='28px' ml='15px' variant='filled' placeholder="Search"/>
		</FocusLock>
        <Divider mt='15px' w={{base:'100%',sm:'360px'}} css={{
    backgroundColor: 'gray', 
    height: '.5px', 
  }}  />
 
  <Flex flexDirection={'column'}>
  
	{ data.search_results?.map((ele,idx)=>(
		<Flex mt={'10px'} ml={'4px'} _hover={{bg:'rgb(239,239,239)'}} cursor={'pointer'} alignItems={'center'}>
		<WrapItem>
    <Avatar width={'45px'} h={'45px'} name={ele.name} src={ele.profileImage ? `${ele.profileImage}`:'https://bit.ly/broken-link'} />
  </WrapItem>
     <Box ml={'20px'} mb={'5px'}>
		<Text fontWeight={'500'}>{ele.name}</Text>
		<Text color={'grey'}>{ele.userName}</Text>
	 </Box>

		</Flex>))}
        
  </Flex>

		</Flex>
		</Flex>
          </DrawerBody>

          
        </DrawerContent>
	  
	  {/* end */}
        
      </Drawer>


			
		

		<Flex direction={"column"} gap={10} w='full' height={"full"}  justifyContent={'space-between'}>
		<Flex flexDirection={'column'} >
				<Link to={"/"} as={RouterLink} pl={2} display={{ base: "none", md: "block" }} cursor='pointer'>
					<InstagramLogo />

				</Link>
				<Link
					to={"/"}
					as={RouterLink}
					p={2}
					display={{ base: "block", md: "none" }}
					borderRadius={6}
					_hover={{
						bg: "whiteAlpha.200",
					}}
					w={10}
					cursor='pointer'
				>
					<InstagramMobileLogo />

				</Link>

				<Flex direction={"column"} gap={5} cursor={"pointer"} mt={'15px'}>
					{sidebarItems.map((item, index) => (
						<Tooltip
							key={index}
							
							
							hasArrow
							label={item.text}
							placement='right'
							ml={1}
							openDelay={500}
							display={{ base: "block", md: "none" }}
						>
							<Link
								display={"flex"}
								to={item.link || ""}
								as={RouterLink}
								alignItems={"center"}
								gap={4}
								
								borderRadius={6}
								p={2}
								ref={btnRef}
								w={{ base: 10, md: "full" }}
								onClick={()=> {item.text==='Search' && onOpen()}}
								justifyContent={{ base: "center", md: "flex-start" }}
								_hover={{
    bg: ' rgb(239,239,239)', 
  }}
							>
								{item.icon}
								<Box display={{ base: "none", md: "block" }}>{item.text}</Box>
							</Link>
						</Tooltip>
					))}
					<Tooltip
							hasArrow
							label={data.login_user.name}
							placement='right'
							ml={1}
							openDelay={500}
							display={{ base: "block", md: "none" }}
						>
							<Link
								display={"flex"}
								as={RouterLink}
								alignItems={"center"}
								gap={4}
								
								borderRadius={6}
								p={2}
								ref={btnRef}
								w={{ base: 10, md: "full" }}
								justifyContent={{ base: "center", md: "flex-start" }}
								_hover={{
    bg: ' rgb(239,239,239)', 
  }}
							>
								{data.isAuth ? data.login_user.profileImage ? <Image src={data.login_user.profileImage} alt="profile" /> :<Avatar size={'sm'} />  :""}
								{data.isAuth ? <Box display={{ base: "none", md: "block" }}>Profile</Box> : ""}
							</Link>
						</Tooltip>
				</Flex>
				</Flex>
				<Flex flexDirection={'column'} gap={'10px'}>
				<Tooltip
					hasArrow
					label={"Logout"}
					placement='right'
					ml={1}
					openDelay={500}
					
					display={{ base: "block", md: "none" }}
				>
					<Link
						display={"flex"}
						to={"/auth"}
						as={RouterLink}
						alignItems={"center"}
						gap={4}
						onClick={()=> dispatch({type:SIGN_OUT})}
						borderRadius={6}
						p={2}
						w={{ base: 10, md: "full" }}
						_hover={{
    bg: ' rgb(239,239,239)', 
  }}
						justifyContent={{ base: "center", md: "flex-start" }}
					>
						{data.isAuth ? <><BiLogOut size={25} />
							<Box  display={{ base: "none", md: "block" }}>Logout</Box></> : <><Loggin /><Box display={{ base: "none", md: "block" }}>Login</Box></>}

					</Link>

				</Tooltip>
				<Tooltip
					hasArrow
					label={"More"}
					placement='right'
					ml={1}
					openDelay={500}
					display={{ base: "block", md: "none" }}
				>


					<Link
						display={"flex"}
						alignItems={"center"}
						gap={4}
						_hover={{ bg: "whiteAlpha.400" }}
						borderRadius={6}
						p={2}
						w={{ base: 10, md: "full" }}
						ml={'-5px'}

						justifyContent={{ base: "center", md: "flex-start" }}
					>
						<Menu>
							<MenuButton as={Button}
								transition='all 0.2s'
								backgroundColor={'white'}
								_hover={{
    bg: ' rgb(239,239,239)', 
  }}
							>
								<Flex gap={'15px'}>
								<Box><MoreLogo /></Box>
								<Text mt={'3px'} display={{base:'none',lg:'block'}}>More</Text>
								</Flex> 
							</MenuButton>
							<MenuList
							
							>
								<MenuItem>Download</MenuItem>
								<MenuItem>Create a Copy</MenuItem>
								<MenuItem>Mark as Draft</MenuItem>
								<MenuItem>Delete</MenuItem>
								<MenuItem>Attend a Workshop</MenuItem>
							</MenuList>
						</Menu>

					</Link>

				</Tooltip>
				</Flex>
			</Flex>
			
			


		</Box>
	);
};

export default Sidebar;