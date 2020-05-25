/* global cy, beforeEach, context, it */

context('Automate', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/');
    });

    const selectRenderMethod = value => cy.get('[data-test-id="select-render-method"]').select(value);

    const setShouldUseMemo = value => cy.get('[data-test-id="checkbox-should-use-memo"]')[value ? 'check' : 'uncheck']();

    const setShouldRenderAsFunction = value => cy.get('[data-test-id="checkbox-should-render-as-function"]')[value ? 'check' : 'uncheck']();

    const runSelection = () => {
        const selectValue = value => cy.get('[data-test-id="select-component"]:first').select(value);
        selectValue('5');
        cy.wait(1000);
        selectValue('10');
        cy.wait(1000);
        selectValue('30');
        cy.wait(1000);
        selectValue('50');
        cy.wait(1000);
        selectValue('80');
        cy.wait(1000);
        selectValue('90');
        cy.wait(1000);
    };

    it('Component with callbacks - use memo', () => {
        selectRenderMethod('0');
        cy.wait(1000);
        runSelection();
    });

    it('Component with callbacks - don\'t use memo', () => {
        selectRenderMethod('0');
        cy.wait(1000);
        setShouldUseMemo(false);
        cy.wait(1000);
        runSelection();
    });

    it('Hook rendering - use memo - as function - import select', () => {
        selectRenderMethod('1');
        cy.wait(1000);
        setShouldUseMemo(true);
        cy.wait(1000);
        setShouldRenderAsFunction(true);
        cy.wait(1000);
        runSelection();
    });

    it('Hook rendering - don\'t use memo - as function - import select', () => {
        selectRenderMethod('1');
        cy.wait(1000);
        setShouldUseMemo(false);
        cy.wait(1000);
        setShouldRenderAsFunction(true);
        cy.wait(1000);
        runSelection();
    });

    it('Hook rendering - use memo - not as function - import select', () => {
        selectRenderMethod('1');
        cy.wait(1000);
        setShouldUseMemo(true);
        cy.wait(1000);
        setShouldRenderAsFunction(false);
        cy.wait(1000);
        runSelection();
    });

    it('Hook rendering - don\'t use memo - not as function - import select', () => {
        selectRenderMethod('1');
        cy.wait(1000);
        setShouldUseMemo(false);
        cy.wait(1000);
        setShouldRenderAsFunction(false);
        cy.wait(1000);
        runSelection();
    });
});
