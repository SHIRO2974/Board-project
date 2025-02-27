import { Global } from "@emotion/react"
import { global } from "./styles/global"
import MainLayout from "./components/common/MainLayout/MainLayout"
import { Route, Routes } from "react-router-dom"
import { useUserMeQuery } from "./queries/userquery"
import AuthRoute from "./routes/AuthRoute/AuthRoute"
import MainRoute from "./routes/MainRoute/MainRoute"

function App() {

	useUserMeQuery();	// 최초의 한번 캐싱 처리

	return (
    	<>
			<Global styles={global} />
				<MainLayout>
						<Routes>
							<Route path="/auth/*" element={<AuthRoute />}/>
							<Route path="/*" element={<MainRoute />}/>
						</Routes>
				</MainLayout>
    	</>
  	)
}

export default App
