/*****************************************************************************
 PROGRAM NAME: multilevelmenu.js
 DESCRIPTION:
 NOTES:
 ******************************************************************************
 MODIFICATION HISTORY

 Date      User ID     Description
 --------  ----------  -------------------------------------------------------
 06/21/18  jpatel      Added logic to compare sub-menu list height with screen
                       size and adjusted it dynamically to display all menus.
 05/02/19  gvtsstag    added $scope.api.insertMenuItem
 *****************************************************************************
 */

angular.module('multilevelmenuMultilevelmenu', ['servoy']).directive('multilevelmenuMultilevelmenu', function() {
		return {
			restrict: 'E',
			scope: {
				model: '=svyModel',
				handlers: "=svyHandlers",
				api: "=svyApi",
				svyServoyapi: "=",
			},
			controller: function($scope, $element, $attrs) {

				/**
				 * If mobile menu is open, close it.
				 * @private
				 */
				$scope.closeMenu = function() {
					setTimeout(function() {
							var toggle = angular.element(document.getElementsByClassName('navbar-toggle'))
							if (!toggle[0].classList.contains('collapsed')) {
								toggle.trigger('click');
							}
						}, 0);

				}

				$scope.api.insertMenuItem = function(pv_menuItem, pv_parentID) {
				   var lv_menu  = $scope.model.menu;
				   var lv_item  = document.getElementById(pv_parentID);
				   var lv_parent = lv_item.parentElement;
				   var lv_ul;
				   var lv_li     = document.createElement("li");
				   var lv_a      = document.createElement("a");

			      /* go through and check if our parent has children */
				   for (var i = 0; i < $scope.model.menu.length; i++) {
				      if ($scope.model.menu[i].itemId == pv_parentID &&
				          $scope.model.menu[i].menuItems             &&
				          $scope.model.menu[i].menuItems.length == 1)
				      {
				         lv_ul = document.createElement("ul");
		               lv_ul.setAttribute("class", "dropdown-menu");
		               lv_ul.id = pv_parentID + "_ul";
		               lv_parent.appendChild(lv_ul);

		               lv_item.setAttribute("class", "dropdown-toggle");
		               lv_item.setAttribute("data-toggle", "dropdown");
		               lv_item.innerHTML += '<b class="caret"></b>';
		               lv_ul.appendChild(lv_li);

				         break;
				      }
				      else if (
			            $scope.model.menu[i].itemId           == pv_parentID &&
			            $scope.model.menu[i].menuItems.length >  1)
				      {
				         lv_ul = document.getElementById(pv_parentID + "_ul");

				         if (!lv_ul) {
	                     lv_ul = document.createElement("ul");
	                     lv_ul.setAttribute("class", "dropdown-menu");
	                     lv_ul.id = pv_parentID + "_ul";
	                     lv_parent.appendChild(lv_ul);
				         }

				         lv_ul.appendChild(lv_li);
				         break;
				      }
				   }
				   lv_li.appendChild(lv_a);
				   lv_a.innerHTML = pv_menuItem.text;
				   lv_a.id        = pv_menuItem.itemId;
	
               $("#" + lv_a.id).on('click', function(event) {
                     if (event.target.classList.contains('disabled')) {
                        event.preventDefault();
                        event.stopPropagation();
                        return;
                     }

                     if ($scope.handlers.onMenuItemSelected) {
                        if (!event.target.classList.contains('dropdown-toggle')) {
                           $scope.closeMenu();
                        }
                        //if item is disabled, return null;
                        $scope.handlers.onMenuItemSelected(event.target.id);
                     }

                  });
				};

				$scope.setupMenu = function() {
					//					console.log($scope.model.svyMarkupId)
					//					console.log($scope.model.menu)
					var menu = document.getElementById($scope.model.svyMarkupId);
					menu.innerHTML = '';
					var items = $scope.model.menu
					if (!items) return;
					//setup main items
					for (var i = 0; i < items.length; i++) {
						var li = document.createElement("li");
						var a = document.createElement("a");

						li.appendChild(a);
						a.innerHTML = items[i].text;

						a.id = items[i].itemId;
						menu.appendChild(li);
						//if we have subitems
						if (items[i].menuItems) {
							a.setAttribute("class", "dropdown-toggle");
							a.setAttribute("data-toggle", "dropdown");
							a.innerHTML = items[i].text + '<b class="caret"></b>';
							//create ul elment to hold additional items
							var ul = document.createElement("ul");
							ul.setAttribute("class", "dropdown-menu");
							li.appendChild(ul);
							loop(items[i].menuItems, ul);
						}

						var ic = items[i].iconStyleClass == null ? '' : items[i].iconStyleClass;
						//if we have an icon style class create div element for icon;
						if (ic) {
							a.innerHTML = '<div class="' + ic + '"></div> ' + a.innerHTML
						}

						//if we have an image
						if (items[i].imageSrc) {

							a.innerHTML = '<img class="' + items[i].imageStyleClass + ' img-icon" src="' + items[i].imageSrc + '"></img> ' + a.innerHTML
						}

						//if an item is disabled
						if (!items[i].enabled) {
							a.setAttribute("class", "disabled");
						}
					}

					//setup sub items
					function loop(arr, el) {
						for (var i = 0; i < arr.length; i++) {
							var li = document.createElement("li");
							var a = document.createElement("a");

							if (arr[i].text && arr[i].text.length) {
								a.innerHTML = arr[i].text;
								a.id = arr[i].itemId;
								li.appendChild(a);
							}
							//if we have a seperator:
							if (arr[i].isDivider) {
								var sep = document.createElement("li");
								sep.setAttribute("role", "separator");
								sep.setAttribute("class", "divider");
								a.setAttribute("class", "disabled" + sc);
								li.appendChild(sep);
							}

							var ic = arr[i].iconStyleClass == null ? '' : arr[i].iconStyleClass;
							var sc = arr[i].styleClass == null ? '' : ' ' + arr[i].styleClass
							li.setAttribute("class", sc);
							//if we have an icon style class create div element for icon;
							if (ic) {
								a.innerHTML = '<div class="' + ic + '"></div> ' + a.innerHTML
							}

							//if we have an image

							//							console.log(arr[i])
							if (arr[i].imageSrc) {
								a.innerHTML = '<img class="' + arr[i].imageStyleClass + ' img-icon" src="' + arr[i].imageSrc + '"></img> ' + a.innerHTML
							}

							if (arr[i].menuItems) {
								a.setAttribute("class", "dropdown-toggle");
								a.setAttribute("data-toggle", "dropdown");
								li.setAttribute("class", "dropdown dropdown-submenu" + sc);

								//create ul elment to hold additional items
								var ul = document.createElement("ul");
								ul.setAttribute("class", "dropdown-menu");
								li.appendChild(ul);
								//continue looping to get other possible sub items
								loop(arr[i].menuItems, ul)
							}

							//if an item is disabled
							if (!arr[i].enabled) {
								a.setAttribute("class", "disabled" + sc);
							}

							if (el) {
								el.appendChild(li);
							}
						}
					}

					//expand menu when selected if we have items
					function expandMenu(event) {
						event.preventDefault();
						event.stopPropagation();
						$(this).parent().siblings().removeClass('open');
						$(this).parent().toggleClass('open');
						$(this).parent()[0].className = 'dropdown dropdown-submenu open';

						//check for the size of ul in comparison to screen height and adjust it to show all menus
						var ulElement = this.nextSibling;
						//padding-top can't be accessed with ulElement.style.paddingTop! So, used jQuery instead.
						var ulPadding = parseInt($(this).next().css("padding-top").slice(0, -2));
						var ulHeight = ulElement.offsetHeight + ulElement.getBoundingClientRect().top + ulPadding;
						var ulWidth = ulElement.getBoundingClientRect().x + ulElement.getBoundingClientRect().width

						if (ulHeight > window.innerHeight) {
							ulElement.style.top = (window.innerHeight - ulHeight) + "px"; //negative value in px
						}

						if (ulWidth > window.innerWidth) {
							ulElement.style.left = -ulElement.getBoundingClientRect().width + "px";
						}
					}
					$('ul.dropdown-menu [data-toggle=dropdown]').on('click', expandMenu);

					$('ul.dropdown-menu [data-toggle=dropdown]').hover(expandMenu);

					//activate handler
					$('a').on('click', function(event) {
							if (event.target.classList.contains('disabled')) {
								event.preventDefault();
								event.stopPropagation();
								return;
							}

							if ($scope.handlers.onMenuItemSelected) {
								if (!event.target.classList.contains('dropdown-toggle')) {
									$scope.closeMenu();
								}
								//if item is disabled, return null;
								$scope.handlers.onMenuItemSelected(event.target.id);
							}

						});

				}

				if (!$scope.model.menuItems) {
					$scope.model.menuItems = [];
				}

				// wait that model is synchronized with the server
				$scope.$watch("model.menu", function(newValue, oldValue) {
						if (newValue) {
							setTimeout(function() {
									$scope.setupMenu();
								}, 200);
						}
					});

			},
			templateUrl: 'multilevelmenu/multilevelmenu/multilevelmenu.html'
		};
	})