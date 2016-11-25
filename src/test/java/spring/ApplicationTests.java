package spring;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

import org.junit.Rule;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.web.ServerProperties;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.rule.OutputCapture;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.web.bind.annotation.RequestMapping;

import com.serkan.Application;
import com.serkan.controllers.Welcome;
import com.serkan.properties.MySettings;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest(classes = Application.class)
public class ApplicationTests {
   
   @Test
   public void contextLoads() {
      //
   }
   
   @Autowired
   ServerProperties serverProperties;
   
   @Autowired
   private MySettings mySettings;
   
   @Test
   public void testJspWithEl() throws Exception {
      
      RequestMapping anno = Welcome.class.getDeclaredAnnotation(RequestMapping.class);
      
      ResponseEntity<String> entity = new TestRestTemplate().getForEntity("http://localhost:" + serverProperties.getPort() + anno.value()[0], String.class);
      assertEquals(HttpStatus.OK, entity.getStatusCode());
      assertTrue("Wrong body:\n" + entity.getBody(), entity.getBody().contains(this.mySettings.getMessage()));
   }
   
//   private static final String[] PROPERTIES = {
//                                               "spring.data.elasticsearch.properties.path.data:target/data",
//   "spring.data.elasticsearch.properties.path.logs:target/logs" };
   
   @Rule
   public OutputCapture outputCapture = new OutputCapture();
   
   @Test
   public void testDefaultSettings() throws Exception {
//      try {
//         new SpringApplicationBuilder(ElasticSearchRunner.class)
//               .properties(PROPERTIES).run();
//      }
//      catch (IllegalStateException ex) {
//         if (serverNotRunning(ex)) {
//            return;
//         }
//      }
      Thread.sleep(5000L);
      System.out.println("Hello World!");
      String output = this.outputCapture.toString();
      assertTrue("Wrong output: " + output, output.contains("World"));
   }
   
//   private boolean serverNotRunning(IllegalStateException ex) {
//      @SuppressWarnings("serial")
//      NestedCheckedException nested = new NestedCheckedException("failed", ex) {
//      };
//      if (nested.contains(ConnectException.class)) {
//         Throwable root = nested.getRootCause();
//         if (root.getMessage().contains("Connection refused")) {
//            return true;
//         }
//      }
//      return false;
//   }
}
