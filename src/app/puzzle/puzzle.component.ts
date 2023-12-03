import { Component, OnInit } from '@angular/core';

declare var $: any; // Add this line to declare the '$' variable

@Component({
  selector: 'app-puzzle',
  templateUrl: './puzzle.component.html',
  styleUrls: ['./puzzle.component.css']
})
export class PuzzleComponent implements OnInit {

  imageIds: string[] = ['image1', 'image2', 'image3'];
  keyId: string = 'keyimage';

  ngOnInit(): void {
    this.initTouchEvents();
    this.generate10DigitNumbers();
    this.openBoxEvent();
  }
  

  private openBoxEvent(): void {
    document.addEventListener("DOMContentLoaded", () => {
      const giftImages = document.querySelectorAll<HTMLImageElement>('.img-fluid');
      let touchInProgress = false; // Flag to track touch events
  
      // Add a flag to track whether touch events are in progress
      document.addEventListener("touchstart", () => {
        touchInProgress = true;
      });
  
      document.addEventListener("touchend", () => {
        touchInProgress = false;
      });
  
      giftImages.forEach((image) => {
        // Add a touchstart event listener to handle touch events
        image.addEventListener('touchstart', (event) => {
          // Prevent the default behavior of touch events
          event.preventDefault();
  
          // Set the flag to true to indicate that touch events are in progress
          touchInProgress = true;
  
          // Change the image source to "Asset 2.png"
          image.src = 'assets/img/Box2.png';
  
          // Set a timeout to revert to "Asset 1.png" after 1000 milliseconds (1 second)
          setTimeout(() => {
            image.src = 'assets/img/Box1.png';
  
            // Get the assigned number of the clicked image
            const clickedImageNumber = parseInt(image.getAttribute('data-number')!);
  
            // Get the assigned number of the key image
            const keyId = this.keyId; // Use this.keyId instead of hard-coded string
            const keyImageNumber = parseInt(document.getElementById(keyId)!.getAttribute('data-number')!);
  
            console.log('Clicked Image Number:', clickedImageNumber);
            console.log('Key Image Number:', keyImageNumber);

            // Check if the numbers match
            if (clickedImageNumber === keyImageNumber) {
              // Open "myModal" if the numbers match
              $('#myModal').modal('show');
            } else {
              // Open "myModal2" if the numbers don't match
              $('#myModal2').modal('show');
            }
  
            // Set the flag back to false after the timeout
            touchInProgress = false;
          }, 1000);
        });
  
        // Add a click event listener to handle click events
        image.addEventListener('click', (event) => {
          // Check if touch events are in progress, and skip the logic if true
          if (touchInProgress) {
            return;
          }
  
          // Change the image source to "Asset 2.png"
          image.src = 'assets/img/Box2.png';
  
          // Set a timeout to revert to "Asset 1.png" after 1000 milliseconds (1 second)
          setTimeout(() => {
            image.src = 'assets/img/Box1.png';
  
            // Get the assigned number of the clicked image
            const clickedImageNumber = parseInt(image.getAttribute('data-number')!);
  
            // Get the assigned number of the key image
            const keyId = this.keyId; // Use this.keyId instead of hard-coded string
            const keyImageNumber = parseInt(document.getElementById(keyId)!.getAttribute('data-number')!);
  
            console.log('Clicked Image Number:', clickedImageNumber);
            console.log('Key Image Number:', keyImageNumber);

            // Check if the numbers match
            if (clickedImageNumber === keyImageNumber) {
              // Open "myModal" if the numbers match
              $('#myModal').modal('show');
            } else {
              // Open "myModal2" if the numbers don't match
              $('#myModal2').modal('show');
            }
          }, 1000);
        });
      });
    });
  }
  

  private initTouchEvents(): void {
    document.addEventListener("DOMContentLoaded", () => {
      // Wait for the DOM to be fully loaded
  
      // Get the element you want to capture touches on
      const touchElement = document.getElementById("container");
  
      // Get the existing box element
      const box = document.getElementById("box");
  
      // Add a touchstart event listener
      touchElement?.addEventListener("touchstart", (event) => {
        // Prevent the default behavior of touch events
        event.preventDefault();
  
        // Get the initial touch coordinates
        const touchX = (event.touches[0] as Touch).clientX;
        const touchY = (event.touches[0] as Touch).clientY;
  
        console.log("Touch Move - X:", touchX, "Y:", touchY);

        // Update the box position
        this.updateBoxPosition(box, touchX, touchY);
  
        // Add a touchmove event listener to capture continuous touch movement
        touchElement?.addEventListener("touchmove", (event) => {
          // Prevent the default behavior of touch events
          event.preventDefault();
  
          // Get the updated touch coordinates
          const touchX = (event.touches[0] as Touch).clientX;
          const touchY = (event.touches[0] as Touch).clientY;
  
          console.log("Touch Move - X:", touchX, "Y:", touchY);
          // Update the box position on touch move
          this.updateBoxPosition(box, touchX, touchY);
        });
      });
    });
  }

// ... (previous code)

private updateBoxPosition(box: HTMLElement | null, x: number, y: number): void {
  if (box) {
    box.style.left = x + "px";
    box.style.top = y + "px";

    // Log box position information
    console.log("Box Position Updated - Left:", x, "Top:", y);
  }
}

private assignNumbersToImages(numbers: number[]): void {
  for (let i = 0; i < this.imageIds.length; i++) {
    const imageId: string = this.imageIds[i];
    const number: number = numbers[i];
    const imageElement: HTMLElement | null = document.getElementById(imageId);

    if (imageElement) {
      imageElement.setAttribute('data-number', number.toString());

      // Log assigned number information
      console.log(`Image ${imageId} - Assigned Number: ${number}`);
    }
  }

  const randomKeyNumber: number = numbers[Math.floor(Math.random() * numbers.length)];
  const keyElement: HTMLElement | null = document.getElementById(this.keyId);

  if (keyElement) {
    keyElement.setAttribute('data-number', randomKeyNumber.toString());

    // Log assigned key number information
    console.log(`Key Element - Assigned Number: ${randomKeyNumber}`);
  }
}

private generate10DigitNumbers(): number[] {
  const numbers: number[] = [];

  for (let i = 0; i < 3; i++) {
    const number: number = Math.floor(1000000000 + Math.random() * 9000000000);
    numbers.push(number);
  }

  this.assignNumbersToImages(numbers);

  // Log generated numbers information
  console.log("Generated Numbers:", numbers);

  return numbers;
}


}
