




















package jetty;

import java.lang.management.ManagementFactory;

import javax.management.MBeanServer;

import org.eclipse.jetty.jmx.MBeanContainer;
import org.eclipse.jetty.server.Connector;
import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.server.nio.SelectChannelConnector;
import org.eclipse.jetty.util.thread.QueuedThreadPool;
import org.eclipse.jetty.webapp.WebAppContext;

/**
 * @ClassName:  
 * @Description: 
 * @author  
 * @date 2011-7-28 上午11:40:58
 * 
 */
public class IPlantMainClass {

	private static final int JETTY_SERVER_PORT = 8080;


	/**
	 * @Title 
	 * @Description: Jetty 本地测试 启动函数
	 * @author flybug
	 * @param args
	 *        设定文件
	 * @return void 返回类型
	 * @throws Exception 
	 */
	public static void main(String[] args) throws Exception {
		startJetty();
	}

	public static void startJetty() throws Exception {

		Server server = new Server();
		//
		QueuedThreadPool threadPool = new QueuedThreadPool();
		threadPool.setMinThreads(10);
		threadPool.setMaxThreads(200);
		server.setThreadPool(threadPool);
	 
		//
		SelectChannelConnector connector = new SelectChannelConnector();
		connector.setPort(JETTY_SERVER_PORT);
		connector.setMaxIdleTime(3000);
		connector.setAcceptors(Runtime.getRuntime().availableProcessors() + 1);
		connector.setStatsOn(false);
		connector.setLowResourcesConnections(32000);
		connector.setLowResourcesMaxIdleTime(60000 * 10);
		server.setConnectors(new Connector[] { connector });

		//
		WebAppContext webAppContext = new WebAppContext();
		webAppContext.setContextPath("/");
		webAppContext.setResourceBase("./webapp");
		server.setHandler(webAppContext);  
		
		//jmx
	    MBeanServer mBeanServer = ManagementFactory.getPlatformMBeanServer();
	    MBeanContainer mBeanContainer = new MBeanContainer(mBeanServer);
	    server.getContainer().addEventListener(mBeanContainer);
	    mBeanContainer.start();

		//
		server.setStopAtShutdown(true);
		server.setSendServerVersion(false);
		server.setSendDateHeader(false);
		server.setGracefulShutdown(1000);

		//
		try {
			server.start();
			server.join();
		} catch (Exception e) {
			e.printStackTrace();
		}

	}
}
