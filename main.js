//var students;
var courses;
var out;
var allstudents=[];
var allcourses=[];

var addNewStudenthelp=function ()
{
	var roll=$("#roll").val();
	var name=$("#name").val();
	var year=$("#year").val();
	addNewStudent(roll,name,year);
}


var addNewStudent=function(roll,name,year)
{
	//var res="kanay";
	var obj;
	obj="roll="+roll;
	obj+="\&name="+name;
	obj+="\&year="+year;
	//console.log(obj);
	/*if(!(checkName(name)&&checkYear(year)&&checkRoll(roll)))	
	{
		alert("Please enter valid input");
	}*/
	$.ajax(
	{
		method: 'POST',
		url:'http://127.0.0.1:5000/addStudent',
		data: obj,
		success: function(response)
		{
			//console.log(response);
			alert(response);
			viewAllStudents();
			res=response;
		},	
		error: function(response)
		{
			//console.log(response.responseText);
			alert(response.responseText);
			res=response.responseText;
			//console.log(res);
		}
		//console.log(response);	
	});
	//console.log(res);
	//return res;
}

var addNewCoursehelp=function()
{
	var name=$("#coursename").val();
	var id=$("#courseid").val();
	addNewCourse(name,id);
}

var addNewCourse=function(name,id)
{
	var obj;
	obj="id="+id;
	obj+="\&name="+name;
	
	//console.log(obj);
	/*if(!(checkName(name)&&checkYear(year)&&checkRoll(roll)))	
	{
		alert("Please enter valid input");
	}*/
	$.ajax(
	{
		method: 'POST',
		url:'http://127.0.0.1:5000/addCourse',
		data: obj,
		success: function(response)
		{
			//console.log(response);
			alert(response);
			viewAllCourses();
			
		},	
		error: function(response)
		{
			//console.log(response.responseText);
			alert(response.responseText);
		}
		
	});
}


var viewAllStudents=function()
{
	$.ajax(
	{
		method:'GET',
		url:'http://127.0.0.1:5000/students',
		data:{},
		success: function(response)
		{
			out=response;
			allstudents=out["students"];
			//console.log(out);
			
			var $tab=$('#studenttablebody');
			var str='';
			//console.log("students allstudentss is");
			//console.log(out);
			//console.log(allstudents);

			for(var i =0;i<allstudents.length;i++)
			{
					//console.log(allstudents[i]);
					
			        str+='<tr><td>'+allstudents[i]["roll"]+'</td>';
			        str+='<td>'+allstudents[i]["name"]+'</td>';
			        str+='<td>'+allstudents[i]["year"]+'</td></tr>';
			}
						
			$tab.html(str);
			displaystudentdrop();
		},
		error: function(response)
		{
			//console.log(response.responseText);
			alert(response.responseText);
		}
	});
	
}
var viewAllCourses=function()
{
	$.ajax(
	{
		method:'GET',
		url:'http://127.0.0.1:5000/courses',
		data:{},
		success: function(response)
		{
			out=response;
			allcourses=out["courses"];
			//console.log(out);
			var $tab=$('#coursetablebody');
			var str='';
			
			//console.log(out);
			//console.log(allcourses);

			for(var i =0;i<allcourses.length;i++)
			{
					//console.log(allcourses[i]);
					
			        str+='<tr><td>'+allcourses[i]["id"]+'</td>';
			        str+='<td>'+allcourses[i]["name"]+'</td>';
			        
			}
						
			$tab.html(str);
			displaycoursedrop();
		},
		error: function(response)
		{
			//console.log(response.responseText);
			alert(response.responseText);
		}
	});
	
}
var displaystudentdrop=function()
{
        var str="";
        
        for(var i=0;i<allstudents.length;i++)
        {
                var name=allstudents[i];

            str += "<option value = \""+name["roll"]+"\">" 
            str += name["name"]+ "</option>";
        }
        //console.log(str);
        $('#namestc').html(str);
        $('#namedsc').html(str);
        $('#nameremstu').html(str);
        $('#studentcoustu').html(str);

}
var displaycoursedrop=function()
{
        var str="";
        
        for(var i=0;i<allcourses.length;i++)
        {
                var name=allcourses[i];

            str += "<option value = \""+name["id"]+"\">" 
            str += name["name"]+ "</option>";
        }
        //console.log(str);


        $('#coursestc').html(str);
        $('#coursedsc').html(str);
        $('#courseremcou').html(str);
        $('#coursestucou').html(str);

}
var addStudentToCoursehelp=function()
{
	var roll=$('#namestc').val();
    var id=$('#coursestc').val();
    //console.log(roll);
    //console.log(id);
    addStudentToCourse(roll,id);

}
var addStudentToCourse=function(roll, id)
{
	var obj;
	obj="roll="+roll;
	obj+="\&id="+id;
	$.ajax(
	{
	method: 'POST',
	url:'http://127.0.0.1:5000/enroll',
	data: obj,
	success: function(response)
	{
		//console.log(response);
		alert(response);
		
		
	},	
	error: function(response)
	{
		//console.log(response.responseText);
		alert(response.responseText);
	}
	});

	
}
var dropStudentFromCoursehelp=function()
{
	var roll=$("#namedsc").val();
	var id=$("#coursedsc").val();
	dropStudentFromCourse(roll,id);
}
var dropStudentFromCourse=function(roll, id)
{
	var obj;
	obj="roll="+roll;
	obj+="\&id="+id;
	$.ajax(
	{
	method: 'POST',
	url:'http://127.0.0.1:5000/drop',
	data: obj,
	success: function(response)
	{
		//console.log(response);
		alert(response);
		viewCoursesTakenhelp();
		viewEnrolledhelp();
		
		
	},	
	error: function(response)
	{
		//console.log(response.responseText);
		alert(response.responseText);
	}
	});

	
}
var removeStudenthelp=function()
{
	var roll=$("#nameremstu").val()
	removeStudent(roll);

}
var removeStudent=function(roll)
{
	var obj;
	obj="roll="+roll;
	
	$.ajax(
	{
	method: 'POST',
	url:'http://127.0.0.1:5000/deleteStudent',
	data: obj,
	success: function(response)
	{
		//console.log(response);
		//alert(response);
		viewAllStudents();
		//viewAllCourses();
		//viewCoursesTakenhelp();
		//viewEnrolledhelp();
	},	
	error: function(response)
	{
		//console.log(response.responseText);
		//alert(response.responseText);
	}
	});
}
var removeCoursehelp=function()
{
	var id=$("#courseremcou").val()
	removeCourse(id);
}
var removeCourse=function(id)
{
	var obj;
	obj="id="+id;
	
	$.ajax(
	{
	method: 'POST',
	url:'http://127.0.0.1:5000/deleteCourse',
	data: obj,
	success: function(response)
	{
		//console.log(response);
		//alert(response);
		//viewAllStudents();
		viewAllCourses();
		//viewCoursesTakenhelp();
		//viewEnrolledhelp();

	},	
	error: function(response)
	{
		//console.log(response.responseText);
		//alert(response.responseText);
	}
	});
}
var viewEnrolledhelp=function()
{
	var id=$("#coursestucou").val()
	viewEnrolled(id);
}
var viewEnrolled=function(id)
{
	var obj;
	obj="id="+id;
	
	$.ajax(
	{
	method: 'GET',
	url:'http://127.0.0.1:5000/studentsEnrolled',
	data: obj,
	success: function(response)
	{
		//console.log(response);
		//alert(response);
		var array=response["students"];
		var str="";

		for(var i=0 ;i<array.length ;i++)
		{
		    str += "<tr><td>" + array[i]["roll"] + "</td><td>" + array[i]["name"] + "</td><td>" + array[i]["year"] + "</td></tr>";
		}
		$("#displayTableStudentCourseBody").html(str);
		
	},	
	error: function(response)
	{
		//console.log(response.responseText);
		alert(response.responseText);
	}
	});
}
var viewCoursesTakenhelp=function()
{
	var roll=$("#studentcoustu").val()
	viewCoursesTaken(roll);
}
var viewCoursesTaken=function(roll)
{
	var obj;
	obj="roll="+roll;
	
	$.ajax(
	{
	method: 'GET',
	url:'http://127.0.0.1:5000/coursesTaken',
	data: obj,
	success: function(response)
	{
			//console.log(response);
		//alert(response);

		var array=response["courses"];
		var str="";

		for(var i=0 ;i<array.length ;i++)
		{
		    str += "<tr><td>" + array[i]["id"] + "</td><td>" + array[i]["name"] +"</td></tr>";
		}
		
		$("#displayTableCourseStudentBody").html(str);
	},	
	error: function(response)
	{
		//console.log(response.responseText);
		alert(response.responseText);
	}
	});	

}

module.exports.courses=courses;
module.exports.out=out;
module.exports.allstudents=allstudents;
module.exports.allcourses=allcourses;
module.exports.addNewStudenthelp=addNewStudenthelp;
module.exports.addNewStudent=addNewStudent;
module.exports.addNewCourse=addNewCourse;
module.exports.addNewCoursehelp=addNewCoursehelp;
module.exports.viewAllCourses=viewAllCourses;
module.exports.viewAllStudents=viewAllStudents;
module.exports.addStudentToCoursehelp=addStudentToCoursehelp;
module.exports.addStudentToCourse=addStudentToCourse;
module.exports.dropStudentFromCoursehelp=dropStudentFromCoursehelp;
module.exports.dropStudentFromCourse=dropStudentFromCourse;
module.exports.removeCoursehelp=removeCoursehelp;
module.exports.removeCourse=removeCourse;
module.exports.removeStudenthelp=removeStudenthelp;
module.exports.removeStudent=removeStudent;
module.exports.viewEnrolledhelp=viewEnrolledhelp;
module.exports.viewEnrolled=viewEnrolled;
module.exports.viewCoursesTakenhelp=viewCoursesTakenhelp;
module.exports.viewCoursesTaken=viewCoursesTaken;











































































































































































/*var checkRoll=function(rl)
{
        var roll=parseInt(rl);
        if(roll>=20110000&&roll<=20169999)
        {
                return true;
        }
        else
        {
                return false;
        }


}

var checkName=function(name)
{
        return (/^[a-zA-Z]+$/).test(name);
}

var checkYear=function(yr)
{
        var year=yr;
        //console.log(year);
        if(year[0]=='U'&&year[1]=='G'&&year[2]>='1'&&year[2]<='6'&&year.length==3)
        {
                return true;
        }
        else
        {
                return false;
        }

}*/

























/*<!DOCTYPE html>
<html>
<head>
        <title>ITWS 2 6 | [20161098]</title>
        
         <meta charset="utf-8">
         <meta name="viewport" content="width=device-width, initial-scale=1">
         <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
         <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
         <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script> 

</head>
<body>
                <div class="jumbotron text-center">

        <h1>Javascript OOP</h1>
        </div>

        <div class="container">

        <div class="row">
        <div class="col-sm-6" >
        <h2>ADD STUDENT TO THE DATABASE</h2>
        <div class="form-group">
        <form id="addNewStudent"  class="form-horizontal">
                ROLL NO.:<input type="text" name="roll" id="roll" class="form-control" placeholder="Enter roll number between 2011XXXX-2016XXXX">
                <br/>
                NAME: <input type="text" name="name " id="name" class="form-control" placeholder="Enter alphabets only">
                <br/>
                YEAR:  <input type="text" name="year" id="year" class="form-control" placeholder="Enter UGX">
                <br/>
                <button type="button"   class="btn btn-primary" onclick="addNewStudenthelp()">ADD</button>

        </form>

        </div>
        </div>
        <div class="col-sm-6">
        
        <h2>ADD COURSE TO THE DATABASE</h2>
        <div class="form-group">
        <form id="addNewCourse" class="form-horizontal">
                
                                COURSE NAME: <input type="text" name="coursename " id="coursename" class="form-control" placeholder="Enter alphabets only">
                <br/>
                COURSE ID:      <input type="text" name="courseid" id="courseid"  class="form-control" placeholder="Enter as XXXYYY X=A-Z Y=0-9">
                <br/>
                <button type="button"  class="btn btn-primary"onclick="addNewCoursehelp()">ADD</button>
                
        </form>
        </div>
        </div>
        </div>
        </div>


        <div id="studenttable" class="jumbotron container">
        <h2>STUDENT TABLE</h2>
        <table id="allStudents" class="table table-bordered" >
               <thead>
                <tr>
                        <td>Roll</td>
                        <td>Name</td>
                        <td>Year</td>
                </tr>
               </thead>
               <tbody id="studenttablebody">
               
               </tbody>
        </table>

        </div>
        <br />
        <br />
        <br />
        

        <div id="coursetable" class="container">
        <div class="row">

        <h2>COURSE TABLE</h2>

        <table id="allCourses" class="table table-bordered">
               <thead>
                <tr>
                        <td>Id</td>
                        <td>Name</td>
                </tr>
               </thead>
               <tbody id="coursetablebody">
               
               </tbody>
        </table>
        <br/>
        <br/>
        <br/>

        </div>
        </div>
        <div class="jumbotron container">
        <div  class="row">
        
        <div class="col-sm-6">
        <h2>Add student to a course</h2>        
        <form id="addStudentToCourse" class="form-horizontal">
        STUDENT NAME:<select id="namestc"></select><br/>
        COURSE NAME:<select id="coursestc"></select><br/>
        <button type="button" onclick="addStudentToCoursehelp()" class="btn btn-primary">ADD</button> 
        </form>
        </div>
        

        <div class="col-sm-6">
        <h2>Drop student from a Course</h2>     
        <form id="DropStudentFromCourse" class="form-horizontal">
        STUDENT NAME:<select id="namedsc"></select><br/>
        COURSE NAME:<select id="coursedsc"></select><br/>
        <button type="button" onclick="dropStudentFromCoursehelp()"
        class="btn btn-primary" >DROP</button> 
        </form>
        </div>
        </div>
        </div>

        <div class="container">
        <div  class="row">
        
            <div class="col-sm-6">
                <h2>Remove  a Course</h2>
                <form id="removeCourse" class="form-horizontal">
                        COURSE :<select id="courseremcou"></select><br/>
                        <button type="button" onclick="removeCoursehelp()" class="btn btn-primary"> REMOVE </button>
                </form>
            </div>
        
        <div>
            <h2>Remove  a Student</h2>
            <form id="removeStudent" class="form-horizontal">
                STUDENT:<select id="nameremstu"></select><br/>
                <button type="button" onclick="removeStudenthelp()" class="btn btn-primary"> REMOVE </button>
            </form>
            </div>
            </div>
            <br/>
            <br/>
            <br/>

            </div>

            <div class="jumbotron container">
            <h2>All students taking a course</h2>
            <form id="showStudentCourse" class="form-horizontal">
            COURSE:<select id="coursestucou"> </select><br/>
            <button type ="button" onclick="viewEnrolledhelp()" class="btn btn-primary">DISPLAY</button>
            </form>
                <table id="displayTableStudentCourse" class="table table-bordered">
                   <thead>
                    <tr>
                            <td>ROLL</td>
                            <td>NAME</td>
                            <td>YEAR</td>
                    </tr>
                   </thead>
                        <tbody id="displayTableStudentCourseBody">
                   
                         </tbody>
                </table>
            </div>

            <div class="container">
            <h2>All courses taken by a student</h2>
            <form id="showCourseStudent">
            STUDENT:<select id="studentcoustu"> </select><br/>
            <button type ="button" onclick="viewCoursesTakenhelp()" class="btn btn-primary">DISPLAY</button>
            </form>
                <table id="displayTableCourseStudent" class="table table-bordered">
                   <thead>
                    <tr>
                            <td>NAME</td>
                            <td>ID</td>
                        
                    </tr>
                   </thead>
                        <tbody id="displayTableCourseStudentBody">
                   
                         </tbody>
                </table>
                <br/>
                <br/>
                <br/>
            </div>
        <script src="main.js"></script>
        
            

</body>
</html>*/
