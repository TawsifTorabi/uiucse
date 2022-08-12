	var jsonFiles = [
		'appdataindex/json/settings.json',
		'appdataindex/json/courseRecordings.json'
	];
	
	
	//Set Some Page Elements
	window.addEventListener('load', (event) => {
			var xmlhttpRoutine = new XMLHttpRequest();
			var url = jsonFiles[0];
			xmlhttpRoutine.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
					var arr = JSON.parse(this.responseText);
					
					document.getElementById('excelSheetLinkBottom').href = arr[0].ExcelLink;
				}
			};	
			xmlhttpRoutine.open("GET", url, true);
			xmlhttpRoutine.send();
	});
	
    String.prototype.isMatch = function(s){
	   return this.toUpperCase().match(s.toUpperCase())!==null
	}
	
	
	
	
	function fireentersearch(event, searchQ, Drivefilter){
		if (event.keyCode == 13) {
			JsonSearch(searchQ, Drivefilter);
		}
	}
	


	function JsonSearch(querry, filter){
	
			var xmlhttpRoutine = new XMLHttpRequest();
			var url = jsonFiles[1];
			xmlhttpRoutine.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
								
					var arr = JSON.parse(this.responseText);
					
					var out = "";
					var i, j;
					var matchCounter = 0;
					
					var html_1 = 	"<table width='100%' border id='searchresultTable'>" +
									"<tr>"+
									"<th class='rtTh'>Sl.</th>"+
									"<th class='rtTh'>Course Title</th>"+
									"<th class='rtTh'>Teacher</th>"+
									"<th class='rtTh'>Trimester</th>"+
									"<th class='rtTh'>Type</th>"+
									"<th class='rtTh'>Link</th>"+
									"<th class='rtTh'>Category</th>"+
									"</tr>";
								
					//Insert Table Header for each conditions
					if(querry !== ''){
						out += html_1;
					}else if(filter !== '' && querry == ''){
						out += html_1;
					}

					console.log(arr.length);

						for(i = 0; i < arr.length; i++){				//Iterate for total json file, 216 times for this

							//Print Iteration Number
							//console.log(i);
							
							var CourseCode, Trimester;

							if(arr[i].CourseCode == null){CourseCode = '';}
								else{CourseCode = arr[i].CourseCode;}
							if(arr[i].Trimester == null){Trimester = '<b style="color: red;">Not Found</b>';}
								else{Trimester = arr[i].Trimester;}
							if(arr[i].Category == null){Category = '<b style="color: red;">Not Identified</b>';}
								else{Category = arr[i].Category;}


							
							var Fl_CourseCode = CourseCode.isMatch(querry) == true;
							var Fl_CourseTitle = arr[i].CourseTitle.isMatch(querry) == true;
							var Fl_Faculty = arr[i].Faculty.isMatch(querry) == true;
							
							var Fl_DriveStorage;
							
							if(filter == 'googledrive'){
								Fl_DriveStorage = arr[i].Link.split('/')[2] == 'drive.google.com';
							}else if(filter == 'terabox'){
								Fl_DriveStorage = arr[i].Link.split('/')[2] == 'terabox.com';
							}
							
							var DynCss = 'display: ;';
							var xam;
							
							if(querry !== ''&& filter == ''){
								xam = Fl_CourseCode || Fl_CourseTitle || Fl_Faculty;
							}
							
							if(querry == '' && filter !== ''){
								xam = Fl_DriveStorage;
							}
							
							if(querry !== '' && filter !== ''){
								console.log('Both Data Entered');
								xam = ((Fl_CourseCode || Fl_CourseTitle) || Fl_Faculty) && Fl_DriveStorage;
								if(filter == 'googledrive'){
									if(arr[i].Link.split('/')[2] !== 'drive.google.com'){
										DynCss = 'display: ;';
									}
								}
							} 

							//Output Process
							if(xam){
								
								matchCounter++;
								console.log(matchCounter);
								
								var linkText;
								if(arr[i].Link.split('/')[2] == 'terabox.com'){
									var linkText = 'Terabox';
								}else if(arr[i].Link.split('/')[2] == 'drive.google.com'){
									var linkText = 'Google Drive';
								}
								
								console.log(i);
								console.log("JSON Course Code -> "+ arr[i].CourseTitle);

								out += 	"<tr style='"+ DynCss +"'>"+
										"<td align='center'> "+ i +" </td>"+
										"<td align='center'>("+ CourseCode +") " + arr[i].CourseTitle + " </td>"+
										"<td align='center'>" + arr[i].Faculty + " </td>"+
										"<td align='center'>" + Trimester + " </td>"+
										"<td align='center'>" + arr[i].Contents + " </td>"+
										"<td align='center'><a target='_blank' href='"+ arr[i].Link +"'>"+ linkText + "</a></td>"+
										"<td align='center'> "+ Category +" </td>"+
										"</tr>";
							}
						}

					
					out += "</table>";
					
					if(matchCounter > 0){
						document.getElementById('searchresult').innerHTML = out;
					}else{
						document.getElementById('searchresult').innerHTML = '<h3><i class="fa fa-exclamation-triangle" aria-hidden="true"></i> Kicchu Nai Bhai! Try Different Keywords Please Bhai!</h3>';						
					}	
							
					
					
				}
			};	
			xmlhttpRoutine.open("GET", url, true);
			xmlhttpRoutine.send();
		
		
	}
