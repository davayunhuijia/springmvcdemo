<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" %>
<html>
<head>
	<title>Home</title>
</head>
<body>
<h1>
	Hello world!  
</h1>

<P>  login ${username}. </P>


<form name='f' action="/login" method='POST'>  
          <table>  
             <tr>  
                <td>User:</td>  
                <td><input type='text' name='j_username' value=''></td>  
             </tr>  
             <tr>  
                <td>Password:</td>  
                <td><input type='password' name='j_password' /></td>  
             </tr>  
             <tr>  
                <td><input name="submit" type="submit" value="submit" /></td>  
             </tr>  
          </table>  
      </form>  
</body>
</html>
