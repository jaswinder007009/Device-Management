export function openForm()
{
    Array.from(document.getElementsByClassName('form-hideable')).forEach(element => {
        element.classList.remove('hide');
        element.classList.add('show');
    });
    // Array.from(document.getElementsByClassName('data-hideable')).forEach(element => {
    //     element.classList.add('hide');
    //     element.classList.remove('show');
    // });
    // Array.from(document.getElementsByClassName('data-hideable1')).forEach(element => {
    //     element.classList.add('hide');
    //     element.classList.remove('show');
    // });
    // Array.from(document.getElementsByClassName('data-hideable2')).forEach(element => {
    //     element.classList.add('hide');
    //     element.classList.remove('show');
    // });

}
export function closeForm()
{
    
    Array.from(document.getElementsByClassName('form-hideable')).forEach(element => {
        element.classList.remove('show');
        element.classList.add('hide');
    });
    // Array.from(document.getElementsByClassName('data-hideable')).forEach(element => {
    //     element.classList.add('show');
    //     element.classList.remove('hide');
    // });
    // Array.from(document.getElementsByClassName('data-hideable1')).forEach(element => {
    //     element.classList.add('show');
    //     element.classList.remove('hide');
    // });
    // Array.from(document.getElementsByClassName('data-hideable2')).forEach(element => {
    //     element.classList.add('show');
    //     element.classList.remove('hide');
    // });
}