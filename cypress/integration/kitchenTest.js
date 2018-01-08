describe('Kitchen Sink-Test', () => {
     context('NavBar and title', () => {
       beforeEach(() => {
         cy
         .visit('http://localhost:8080/')
       })
       it('Should title be right', () => {
         cy
         .title().should('include','Kitchen Sink')
       })
       it('Should Commands have dropdown menu', () => {
         cy
         .get('.dropdown-toggle').contains('Commands')
         .get('.dropdown-menu li').contains('Querying')
         .get('.dropdown-toggle')
         .next()
         .children().should('have.length',23)
         .get('.dropdown')
         .siblings().should('have.length',2)
       })
     })
     context('Querying', () => {
        beforeEach(() => {
          cy
          .visit('http://localhost:8080/commands/querying')
        })
        it('Should page title be right', () => {
          cy
          .get('.container').contains('Querying')
        })
        it('cy.get() - query DOM element', () => {
          cy
          .get('#query-btn')
          .should('contain','Button').click()
        })
        it('cy.contains() - query DOM element with matching content', () => {
          cy
          .get('.query-list')
          .contains('oranges')
          .should('have.class','second')
          .get('.query-button')
          .contains('Save Form')
          .should('have.class','btn')
          .click()
        })
        it('cy.within() - query DOM element within a specific element', () => {
           cy
           .get('#inputName')
           .type('Nemanja').type('{enter}')
           .get('.query-form').within(() => {
                .get('#inputEmail')
                .should('have.attr','placeholder','Email')
                .type('nemanja@email.com')
                .get('#inputPassword')
                .should('have.attr','placeholder','Password')
                .type('123456')
           })
        })
        it('cy.root() - query the root DOM element', () => {
           cy
           .get('.query-ul').within(() => {
           .root().should('have.class','query-ul')
           })
           .get('.query-ul')
           .children().should('have.length',3)
        })
     })
     context('Traversal', () => {
       beforeEach(() => {
         cy
         .visit('http://localhost:8080/commands/traversal')
       })
       it('cy.children - get children of DOM element', () => {
         cy
         .get('.traversal-breadcrumb')
         .children().should('have.length',3)
         .get('.traversal-breadcrumb')
         .children()
         .last().should('have.class','active')
         .get('.traversal-breadcrumb')
         .children()
         .eq(1).click()
       })
       it('cy.closest() - get the closest ancestor DOM element', () => {
         cy
         .get('.traversal-badge')
         .closest('ul').should('have.class', 'list-group')
       })
       it('cy.eq() - get a DOM element at a speficic index', () => {
         cy
         .get('.traversal-list li')
         .eq(2).should('contain','persian')
         .get('.traversal-list')
         .children().should('have.length',5)
       })
       it('cy.filter() - get DOM element that match a specific selector', () => {
         cy
         .get('.traversal-nav li')
         .filter('.active').should('contain','About')
       })
       it('cy.find() - get descendant DOM elements of the selector', () => {
         cy
         .get('.traversal-pagination')
         .find('li')
         .find('a').should('have.length',7)
       })
       it('cy.first() - get the first DOM element within elements', () => {
         cy
         .get('.traversal-table thead')
         .find('tr')
         .first().should('contain','#')
         .get('.traversal-table tbody')
         .find('tr')
         .first().should('contain','1')
       })
       it('cy.last() - get the last DOM element within elements', () => {
         cy
         .get('.traversal-buttons')
         .last()
         .should('contain','Submit').click()
       })
       it('cy.nextAll() - get all of the next sibling Dom elements', () => {
         cy
         .get('.traversal-next-all li')
         .filter('.second')
         .nextAll()
         .should('have.length',3)
       })
       it('cy.nextUntil() - get all of the next sibling DOM element until another element', () => {
         cy
         .get('#veggies')
         .nextUntil('#nuts').should('have.length',3)
       })
       it('not() - opposite of filter()', () => {
         cy
         .get('.traversal-disabled')
         .not('[disabled]').should('contain', 'Button')
       })
     })
     context('Actions', () => {
       beforeEach(() => {
         cy
         .visit('http://localhost:8080/commands/actions')
       })
       it('type() - type into a DOM element',function(){
         cy
         .get('#email1')
         .type('nemanja@email.com').should('have.value','nemanja@email.com')
         .get('.action-disabled')
         .type('Is not disabled',{force:true})
         .should('have.value','Is not disabled')
       })
       it('focus() - focus on a DOM element', () => {
         cy
         .get('#password1')
         .focus().should('have.class', 'focus')
         .prev().should('have.attr', 'style', 'color: orange;')
       })
       it('blur() - blur on a DOM element', () => {
         cy
         .get('#fullName1')
         .type('Hello')
         .blur().should('have.class', 'error')
         .prev().should('have.attr', 'style', 'color: red;')
        })
       it('clear() - clear on a DOM element', () => {
          cy
          .get('#description')
          .type('Hello world')
          .should('have.value','Hello world')
          .clear()
          .should('have.value','')
       })
       it('submit() - submit a form', () => {
         cy
         .get('#couponCode1')
         .type('One coupon').should('have.value','One coupon')
         .get('.action-form').submit()
         .next().should('contain','Your form has been submitted!')
       })
       it('click() - click a DOM element', () => {
         cy
         .get('.action-btn').click()
         .next().should('have.class','popover')
         .get('#action-canvas').click('right')
         .get('.action-labels>.label').click({multiple:true})
         .get('.action-opacity>.btn').click({force: true})
       })
       it('dblclick() - double click a DOM element', () => {
         cy
         .get('.action-div')
         .dblclick().should('not.be.visible')
         .get('.action-input-hidden').should('be.visible')
       })
       it('check() - check checkbox or radio', () => {
         cy
         .get('.action-checkboxes [type="checkbox"]')
         .not('[disabled]')
         .check().should('be.checked')
         .get('.action-checkboxes [type="checkbox"]')
         .filter('[disabled]')
         .check({force:true}).should('be.checked')
         .get('.action-multiple-checkboxes [type="checkbox"]')
         .not('[disabled]')
         .check(['checkbox1','checkbox2']).should('be.checked')
         .get('.action-radios [type="radio"]')
         .not('[disabled]')
         .check().should('be.checked')
       })
       it('uncheck() - uncheck checkbox or radio', () => {
         cy
         .get('.action-check [type="checkbox"]')
         .not('[disabled]')
         .uncheck().should('not.be.checked')
       })
       it('select() - to select an option in a select', () => {
         cy
         .get('.action-select')
         .select('fr-apples')
       })
       it('scrollIntoView() - scroll an element into view', () => {
         cy
         .get('#scroll-horizontal button').should('not.be.visible')
         .get('#scroll-horizontal button')
         .scrollIntoView().should('be.visible')
       })
       it('scrollTo() - scroll the window or a scrollable element to a specific position', () => {
         cy
         .get('#scrollable-horizontal').scrollTo('right')
         .get('#scrollable-vertical').scrollTo(220, 220)
       })
       it('trigger() - trigger an event on a DOM element', () => {
         cy
         .get('.trigger-input-range')
         .invoke('val',25)
         .trigger('change')
         .get('input[type=range]')
         .siblings('p').should('contain',25)
       })
     })
     context('Viewport', () => {
       beforeEach(() => {
         cy
         .visit('http://localhost:8080/')
       })
       it('viewport() - set viewport size and dimension', () => {
         cy
         .get('#navbar').should('be.visible')
         .viewport(320, 480)
         .get('#navbar').should('not.be.visible')
         .get('.navbar-toggle').should('be.visible').click()
         .get('.nav')
         .find('a').should('be.visible')
       })
     })
     context('Location', () => {
       beforeEach(() => {
         cy
         .visit('http://localhost:8080/')
       })
       it('location() - get window.location', () => {
         cy
         .location().should((location) => {
           expect(location.href).to.eq('http://localhost:8080/')
           expect(location.hostname).to.eq('localhost')
           expect(location.port).to.eq('8080')
         })
       })
       it('url() - get current url', () => {
         cy
         .url().should('eq','http://localhost:8080/')
       })
     })
     context('Navigation', () => {
         beforeEach(() => {
          cy
          .visit('http://localhost:8080/commands/navigation')
        })
         it('go() - to go back or forward in the browser\'s history', () => {
           cy
           .location('pathname').should('include','navigation')
           .go('back')
           .location('pathname').should('not.include','navigation')
           .go('forward')
           .location('pathname').should('include','navigation')
         })
     })
     context('Assertions', () => {
       beforeEach(() => {
        cy
        .visit('http://localhost:8080/commands/assertions')
      })
        it('should() - make an assertion about the current subject', () => {
          cy
          .get('.assertion-table')
          .find('thead th:last').should('contain','Column heading')
        })
       it('and() - chain a multiple assertions together', () => {
         cy
         .get('.assertions-link')
         .should('contain','Cypress Docs')
         .and('attr','href')
         .and('include','cypress.io')
       })
       it('expect() - make an assertion about specified subject', () => {
         cy
         .get('.assertions-p')
         .find('p')
         .should(function($p){
         var texts = $p.map(function(i, el){
            return Cypress.$(el).text()
         })
         var texts = texts.get()
         expect(texts).to.have.length(3)
         expect(texts).to.deep.eq([
          'Some text from first p',
          'More text from second p',
          'And even more text from third p'
        ])
       })
       })
      })
    context('Miscellaneous', () => {
      beforeEach(() => {
       cy
       .visit('http://localhost:8080/commands/misc')
     })
      it('end() - end the command chain', () => {
         cy
         .get('.misc-table')
         .within(() => {
           .contains('Cheryl').click().end()
           .contains('Charles').click()
         })
      })
      it('exec() - execute a system command', () => {
        cy
        .exec('echo Hello world')
        .its('stdout').should('contain','Hello world')
      })
      it('focused() - get the DOM element that has focus', () => {
        cy
        .get('#name')
        .click()
        .focused().should('have.class','form-control')
        .get('#description')
        .click()
        .focused().should('have.class','form-control')
      })
      it('wrap() - wrap an object', () => {
        cy
        .wrap({name:'Nemanja'})
        .should('have.property','name')
        .and('contain','Nemanja')
      })
    })
    context('Connectors', () => {
        beforeEach(() => {
         cy
         .visit('http://localhost:8080/commands/connectors')
       })
        it('each() - iterate over the elements of a current subject', () => {
          cy
          .get('.connectors-each-ul>li')
          .each(function($el,index,$list){
              console.log($el,index,$list)
            })
        })
        it('its() - get the properties on the current subject', () => {
          cy
          .get('.connectors-its-ul>li')
          .its('length').should('be.eq',3)
        })
        it('invoke() - invoke a function on the current subject', () => {
          cy
          .get('.connectors-div').should('not.be.visible')
          .invoke('show')
          .should('be.visible')
        })
        it('spread() - spread an array as individual arguments to a callback function', () => {
          var arr = ['one','two','three']
          cy
          .wrap(arr)
          .spread(function(one,two,three){
            expect(one).to.eq('one')
            expect(two).to.eq('two')
            expect(three).to.eq('three')
          })
        })
         it('then() - invoke a callback function with the current subject', () => {
           cy
           .get('.connectors-list>li')
           .then(($lis)=>{
             expect($lis).to.have.length(3)
             expect($lis.eq(0)).to.contain('Walk the dog')
             expect($lis.eq(1)).to.contain('Feed the cat')
             expect($lis.eq(2)).to.contain('Write JavaScript')
           })
         })
    })
    context('Aliasing', () => {
      beforeEach(() => {
       cy
       .visit('http://localhost:8080/commands/aliasing')
     })
      it('as() - alias a route or DOM element for use later', () => {
        cy
        .get('.as-table')
        .find('tbody>tr')
        .first()
        .find('td')
        .first()
        .find('button').as('firstBtn')
        .get('@firstBtn').click()
        .get('@firstBtn')
        .should('have.class', 'btn-success')
        .and('contain', 'Changed')
      })
    })
    context('Network Requests', () => {
      beforeEach(() => {
       cy
       .visit('http://localhost:8080/commands/network-requests')
     })
      it('server() - control the behavior of network requests and responses', () => {
        cy
        .server().should((server) => {
          expect(server.method).to.eq('GET')
          expect(server.status).to.eq(200)
          expect(server.response).to.be.null
        })
      })
      it('request() - make an XHR request', () => {
        cy
        .request('https://jsonplaceholder.typicode.com/comments').should((response) => {
           expect(response.status).to.eq(200)
           expect(response.body).to.have.length(500)
           expect(response).to.have.property('headers')
           expect(response).to.have.property('duration')
       })
      })
      it('route() - route response to matching requests', () => {
         var msg = 'this message doesn\'t exist'
         cy
         .server()
         .route(/comments\/1/).as('getComment')
         .get('.network-btn').click()
         .wait('@getComment').its('status').should('eq',200)
         .route('POST','/comments').as('postComment')
         .get('.network-post').click()
         .wait('@postComment')
         .get('.network-post')
         .next().should('have.class','network-post-comment')
         .and('contain','POST successful!')
         .get('@postComment').then((xhr) => {
            expect(xhr.requestBody).to.include('email')
            expect(xhr.requestHeaders).to.have.property('Content-Type')
            expect(xhr.responseBody).to.have.property('name','Using POST in cy.route()')
            expect(xhr.responseBody).to.have.property('email','hello@cypress.io')
         })

      })
    })
    context('Files', () => {
        beforeEach(() => {
         cy
         .visit('http://localhost:8080/commands/files')
     })
        it('fixtures() - load a fixture', () => {
          cy
          .server()
          .fixture('example.json').as('comment')
          .route(/comments/,'@comment').as('getComment')
          .get('.fixture-btn').click()
          .wait('@getComment')
          .its('responseBody')
            .should('have.property','name')
            .and('contain','Using fixtures to represent data')
        })
        it('files() - read a file\'s content',() => {
          cy
          .readFile('cypress.json').then((json) => {
            expect(json).to.be.an('object')
          })
        })
    })
})
